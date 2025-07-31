-- Create a test user
INSERT INTO
  auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    raw_app_meta_data,
    raw_user_meta_data,
    confirmation_token,
    email_change,
    email_change_token_new,
    recovery_token
  )
VALUES
  (
    '00000000-0000-0000-0000-000000000000',
    uuid_generate_v4 (),
    'authenticated',
    'authenticated',
    'erikpastorrios1994@gmail.com',
    crypt ('LeoMessi10!', gen_salt ('bf')),
    NOW(),
    '{"provider":"email","providers":["email"]}',
    '{"display_name":"Erik Pastor"}',
    '', -- confirmation_token
    '', -- email_change
    '', -- email_change_token_new
    '' -- recovery_token
  );

-- Create a new identity for the user
INSERT INTO
  auth.identities (
    provider_id,
    user_id,
    identity_data,
    provider,
    last_sign_in_at
  )
SELECT
  u.email,
  u.id,
  jsonb_build_object('sub', u.id, 'email', u.email),
  'email',
  NOW()
FROM
  auth.users u
WHERE
  u.email = 'erikpastorrios1994@gmail.com';
