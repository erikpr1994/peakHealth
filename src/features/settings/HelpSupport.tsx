"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LifeBuoy, BookOpen, MessageSquare, Mail } from "lucide-react";

export default function HelpSupport() {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          <LifeBuoy className="w-8 h-8 text-indigo-600" />
          Help & Support
        </h1>
        <p className="text-gray-500 mt-2">
          Find answers to your questions and get the help you need.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left column for contact form and quick links */}
        <div className="md:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Mail className="w-6 h-6 text-indigo-600" />
                Contact Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div>
                  <label
                    htmlFor="topic"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    What can we help you with?
                  </label>
                  <Select>
                    <SelectTrigger id="topic">
                      <SelectValue placeholder="Select a topic" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technical-issue">
                        Technical Issue
                      </SelectItem>
                      <SelectItem value="billing-subscription">
                        Billing & Subscription
                      </SelectItem>
                      <SelectItem value="feature-request">
                        Feature Request
                      </SelectItem>
                      <SelectItem value="account-access">
                        Account Access
                      </SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Subject
                  </label>
                  <Input
                    id="subject"
                    placeholder="e.g., Trouble syncing my device"
                  />
                </div>
                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Description
                  </label>
                  <Textarea
                    id="description"
                    placeholder="Please describe your issue in detail..."
                    rows={6}
                  />
                </div>
                <div className="flex justify-end">
                  <Button className="bg-indigo-600 hover:bg-indigo-700">
                    Send Message
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Right column for FAQ and Guides */}
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-indigo-600" />
                Guides & Tutorials
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4 text-indigo-600">
                <li>
                  <a href="#" className="hover:underline">
                    Getting Started with Peak Health
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    How to Create a Custom Routine
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Connecting Your Wearable Device
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Understanding Your Performance Analytics
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Managing Your Subscription
                  </a>
                </li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <MessageSquare className="w-6 h-6 text-indigo-600" />
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4 text-gray-700">
                <li>
                  <a href="#" className="hover:text-indigo-600">
                    How do I reset my password?
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-indigo-600">
                    Is my data secure?
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-indigo-600">
                    Can I use the app offline?
                  </a>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
