import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();

  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user) {
      return NextResponse.json(
        {
          flags: {},
          userTypes: [],
          userGroups: [],
        },
        { status: 200 }
      );
    }

    const { user } = session;
    const environment = process.env.NEXT_PUBLIC_ENVIRONMENT || "development";

    const [flagsResponse, typesResponse, groupsResponse] = await Promise.all([
      supabase.rpc("get_user_feature_flags", {
        user_id: user.id,
        environment_param: environment,
      }),
      supabase.rpc("get_user_types", { user_id: user.id }),
      supabase.rpc("get_user_groups", { user_id: user.id }),
    ]);

    if (flagsResponse.error) throw flagsResponse.error;
    if (typesResponse.error) throw typesResponse.error;
    if (groupsResponse.error) throw groupsResponse.error;

    return NextResponse.json({
      flags: flagsResponse.data,
      userTypes: typesResponse.data,
      userGroups: groupsResponse.data,
    });
  } catch (error: any) {
    console.error("Error fetching feature flags:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
