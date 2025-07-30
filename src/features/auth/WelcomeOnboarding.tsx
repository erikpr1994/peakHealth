import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Send,
  Sparkles,
  User,
  Target,
  Dumbbell,
  ArrowRight,
  X,
} from "lucide-react";

interface Message {
  id: string;
  type: "ai" | "user";
  content: string;
  timestamp: Date;
  options?: string[];

  requiresInput?: boolean;
}

interface OnboardingData {
  name: string;
  fitnessLevel: string;
  goals: string[];
  timeAvailable: string;
  equipmentAccess: string;
  workoutTypes: string[];
  experience: string;
  limitations: string;
  motivation: string;
  completedAt: Date;
  skipped?: boolean;
}

interface WelcomeOnboardingProps {
  onComplete: (data: OnboardingData) => void;
  onSkip: () => void;
}

const ONBOARDING_FLOW = [
  {
    id: "welcome",
    message:
      "Welcome to Peak Health! 🎉 I'm your AI fitness assistant, and I'm here to help create the perfect fitness experience for you. What's your name?",
    requiresInput: true,
    inputType: "text",
  },
  {
    id: "intro",
    message:
      "Nice to meet you, {name}! I'd love to learn about your fitness journey so I can personalize Peak Health just for you. This will only take about 2-3 minutes. Ready to get started?",
    options: ["Let's do this!", "I'm ready", "Yes, let's go!"],
  },
  {
    id: "fitness-level",
    message: "First, how would you describe your current fitness level?",
    options: [
      "Complete beginner",
      "Some experience",
      "Intermediate",
      "Advanced",
      "Athlete/Very advanced",
    ],
  },
  {
    id: "goals",
    message: "What are your main fitness goals? (You can select multiple)",
    options: [
      "Lose weight",
      "Build muscle",
      "Improve endurance",
      "Increase strength",
      "Stay healthy",
      "Improve flexibility",
      "Sport-specific training",
      "Rehabilitation",
    ],
  },
  {
    id: "time-availability",
    message: "How much time do you typically have for workouts?",
    options: [
      "15-30 minutes",
      "30-45 minutes",
      "45-60 minutes",
      "60+ minutes",
      "It varies",
    ],
  },
  {
    id: "equipment",
    message: "What equipment do you have access to?",
    options: [
      "Just bodyweight",
      "Basic equipment at home",
      "Full home gym",
      "Commercial gym",
      "Multiple gym locations",
      "It depends where I am",
    ],
  },
  {
    id: "workout-types",
    message:
      "What types of workouts do you enjoy or want to try? (Select all that apply)",
    options: [
      "Cardio",
      "Strength training",
      "HIIT",
      "Yoga/Stretching",
      "Functional fitness",
      "Group classes",
      "Outdoor activities",
      "Sports",
    ],
  },
  {
    id: "experience",
    message: "Have you used fitness apps or worked with trainers before?",
    options: [
      "This is my first fitness app",
      "I've tried a few apps",
      "I use fitness apps regularly",
      "I've worked with trainers",
      "I'm a fitness professional",
    ],
  },
  {
    id: "limitations",
    message:
      "Do you have any injuries, physical limitations, or specific considerations I should know about? (Optional - this helps me suggest safer exercises)",
    requiresInput: true,
    inputType: "textarea",
    optional: true,
  },
  {
    id: "motivation",
    message: "Finally, what motivates you most to stay active and healthy?",
    requiresInput: true,
    inputType: "textarea",
  },
  {
    id: "completion",
    message:
      "Perfect! 🎉 I now have everything I need to personalize your Peak Health experience. Based on your responses, I'll customize your dashboard, suggest relevant routines, and help you reach your goals. Welcome to your fitness journey!",
    isCompletion: true,
  },
];

export default function WelcomeOnboarding({
  onComplete,
  onSkip,
}: WelcomeOnboardingProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [onboardingData, setOnboardingData] = useState<Partial<OnboardingData>>(
    {
      goals: [],
      workoutTypes: [],
    }
  );
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Start with the first message
    addAIMessage(ONBOARDING_FLOW[0].message);
  }, []);

  const addAIMessage = (
    content: string,
    options?: string[],
    requiresInput?: boolean
  ) => {
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const processedContent = content.replace(
        "{name}",
        onboardingData.name || ""
      );

      const newMessage: Message = {
        id: Date.now().toString(),
        type: "ai",
        content: processedContent,
        timestamp: new Date(),
        options,

        requiresInput,
      };

      setMessages((prev) => [...prev, newMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  };

  const addUserMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");
  };

  const handleOptionClick = (option: string) => {
    addUserMessage(option);
    processUserResponse(option);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    addUserMessage(inputValue);
    processUserResponse(inputValue);
  };

  const processUserResponse = (response: string) => {
    const currentStep = ONBOARDING_FLOW[currentStepIndex];

    // Store the response in onboarding data
    let updatedData = { ...onboardingData };

    switch (currentStep.id) {
      case "welcome":
        updatedData.name = response;
        break;
      case "fitness-level":
        updatedData.fitnessLevel = response;
        break;
      case "goals":
        if (!updatedData.goals) updatedData.goals = [];
        if (!updatedData.goals.includes(response)) {
          updatedData.goals.push(response);
        }
        break;
      case "time-availability":
        updatedData.timeAvailable = response;
        break;
      case "equipment":
        updatedData.equipmentAccess = response;
        break;
      case "workout-types":
        if (!updatedData.workoutTypes) updatedData.workoutTypes = [];
        if (!updatedData.workoutTypes.includes(response)) {
          updatedData.workoutTypes.push(response);
        }
        break;
      case "experience":
        updatedData.experience = response;
        break;
      case "limitations":
        updatedData.limitations = response;
        break;
      case "motivation":
        updatedData.motivation = response;
        break;
    }

    setOnboardingData(updatedData);

    // Move to next step
    const nextStepIndex = currentStepIndex + 1;

    if (nextStepIndex < ONBOARDING_FLOW.length) {
      setCurrentStepIndex(nextStepIndex);
      const nextStep = ONBOARDING_FLOW[nextStepIndex];

      if (nextStep.isCompletion) {
        // Complete onboarding
        setTimeout(() => {
          addAIMessage(nextStep.message);
          setTimeout(() => {
            onComplete({
              ...updatedData,
              completedAt: new Date(),
            } as OnboardingData);
          }, 3000);
        }, 1000);
      } else {
        // Continue with next question
        setTimeout(() => {
          addAIMessage(
            nextStep.message,
            nextStep.options,
            nextStep.requiresInput
          );
        }, 1000);
      }
    }
  };

  const progress = ((currentStepIndex + 1) / ONBOARDING_FLOW.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Skip Button - Fixed Position */}
        <div className="fixed top-4 right-4 z-10">
          <Button
            variant="outline"
            size="sm"
            onClick={onSkip}
            className="bg-white/80 backdrop-blur-sm border-gray-300 hover:bg-white/90 flex items-center gap-2"
          >
            <X className="w-4 h-4" />
            Skip for now
          </Button>
        </div>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Peak Health</h1>
          </div>
          <p className="text-gray-600">
            Let's personalize your fitness journey
          </p>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <span>Progress</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        {/* Chat Interface */}
        <Card className="h-96 flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex gap-3 max-w-[80%] ${
                    message.type === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  {/* Avatar */}
                  <Avatar className="w-8 h-8 flex-shrink-0">
                    <AvatarFallback
                      className={
                        message.type === "ai"
                          ? "bg-primary text-white"
                          : "bg-gray-200"
                      }
                    >
                      {message.type === "ai" ? (
                        <Sparkles className="w-4 h-4" />
                      ) : (
                        <User className="w-4 h-4" />
                      )}
                    </AvatarFallback>
                  </Avatar>

                  {/* Message Content */}
                  <div>
                    <div
                      className={`rounded-2xl px-4 py-3 ${
                        message.type === "user"
                          ? "bg-primary text-white"
                          : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                    </div>

                    {/* Options */}
                    {message.options && message.type === "ai" && (
                      <div className="mt-3 space-y-2">
                        <div className="grid grid-cols-1 gap-2">
                          {message.options.map((option, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              className="justify-start h-auto py-2 px-3 text-sm"
                              onClick={() => handleOptionClick(option)}
                            >
                              {option}
                            </Button>
                          ))}
                        </div>

                        {/* Multi-select hint for certain steps */}
                        {(ONBOARDING_FLOW[currentStepIndex]?.id === "goals" ||
                          ONBOARDING_FLOW[currentStepIndex]?.id ===
                            "workout-types") && (
                          <p className="text-xs text-gray-500 mt-2">
                            💡 You can select multiple options. Click "Continue"
                            when done.
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-primary text-white">
                      <Sparkles className="w-4 h-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-gray-100 rounded-2xl px-4 py-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      />
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t p-4">
            {/* Show Continue button for multi-select questions */}
            {(ONBOARDING_FLOW[currentStepIndex]?.id === "goals" ||
              ONBOARDING_FLOW[currentStepIndex]?.id === "workout-types") &&
              currentStepIndex < ONBOARDING_FLOW.length - 1 && (
                <div className="mb-3">
                  <Button
                    onClick={() => {
                      const nextStepIndex = currentStepIndex + 1;
                      setCurrentStepIndex(nextStepIndex);
                      const nextStep = ONBOARDING_FLOW[nextStepIndex];
                      addAIMessage(
                        nextStep.message,
                        nextStep.options,
                        nextStep.requiresInput
                      );
                    }}
                    className="w-full"
                    disabled={
                      (ONBOARDING_FLOW[currentStepIndex]?.id === "goals" &&
                        (!onboardingData.goals ||
                          onboardingData.goals.length === 0)) ||
                      (ONBOARDING_FLOW[currentStepIndex]?.id ===
                        "workout-types" &&
                        (!onboardingData.workoutTypes ||
                          onboardingData.workoutTypes.length === 0))
                    }
                  >
                    Continue <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              )}

            {/* Show input for text-based questions */}
            {ONBOARDING_FLOW[currentStepIndex]?.requiresInput &&
              !isTyping &&
              currentStepIndex < ONBOARDING_FLOW.length - 1 && (
                <form onSubmit={handleSubmit} className="flex gap-2">
                  {ONBOARDING_FLOW[currentStepIndex]?.inputType ===
                  "textarea" ? (
                    <Textarea
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder={
                        ONBOARDING_FLOW[currentStepIndex]?.optional
                          ? "Type your response (optional)..."
                          : "Type your response..."
                      }
                      className="flex-1 min-h-[60px] resize-none"
                    />
                  ) : (
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Type your response..."
                      className="flex-1"
                    />
                  )}
                  <Button
                    type="submit"
                    size="sm"
                    className="px-3"
                    disabled={
                      !inputValue.trim() &&
                      !ONBOARDING_FLOW[currentStepIndex]?.optional
                    }
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              )}
          </div>
        </Card>

        {/* Selected Preferences Preview */}
        {(onboardingData.goals?.length ||
          onboardingData.workoutTypes?.length) && (
          <Card className="mt-4 p-4">
            <h3 className="font-medium text-gray-900 mb-3">Your Selections</h3>
            <div className="space-y-2">
              {onboardingData.goals && onboardingData.goals.length > 0 && (
                <div>
                  <span className="text-sm text-gray-600 block mb-1">
                    Goals:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {onboardingData.goals.map((goal, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs"
                      >
                        <Target className="w-3 h-3 mr-1" />
                        {goal}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {onboardingData.workoutTypes &&
                onboardingData.workoutTypes.length > 0 && (
                  <div>
                    <span className="text-sm text-gray-600 block mb-1">
                      Workout Types:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {onboardingData.workoutTypes.map((type, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs"
                        >
                          <Dumbbell className="w-3 h-3 mr-1" />
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
            </div>
          </Card>
        )}

        {/* Skip hint at the bottom */}
        <div className="text-center mt-4">
          <p className="text-sm text-gray-500">
            Want to explore the app first? You can always complete this setup
            later in your profile.
          </p>
        </div>
      </div>
    </div>
  );
}
