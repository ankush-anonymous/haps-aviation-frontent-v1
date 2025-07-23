"use client"
import type React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LogIn, Plane, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { mentorAPI } from "@/lib/api";
import { Suspense } from 'react';


export default function MentorLoginPage() {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  const error = searchParams.get("error");
  const email = searchParams.get("email"); // ✅ Step 1: Extract email
  const name = searchParams.get("name");
    const [status, setStatus] = useState("Loading...");

  

  // Handle OAuth callback token
 useEffect(() => {
  const picture = searchParams.get("picture");
  const flow = searchParams.get("flow");
  const email = searchParams.get("email");
  const name = searchParams.get("name");

  if (!email || !name || !picture) {
    console.log("OAuth data missing. Waiting for query params...");
    return;
  }

  // Store OAuth data in localStorage
  localStorage.setItem("mentor_email", email);
  localStorage.setItem("mentor_name", name);
  localStorage.setItem("mentor_picture", picture);

  const loginWithOAuth = async () => {
    try {
      setLoading(true);
      const response = await mentorAPI.loginMentor(email); // Backend call
      localStorage.setItem("mentorData", JSON.stringify(response.mentor));
      localStorage.setItem("isMentorLoggedIn", "true");
      router.replace("/mentor/dashboard"); // ✅ Redirect
    } catch (err: any) {
      if (err.response?.status === 404) {
        router.replace(`/mentor/onboard?email=${email}&name=${name}`);
      } else {
        router.replace("/mentor/login?error=oauth_failed");
      }
    } finally {
      setLoading(false);
    }
  };

  loginWithOAuth();
}, [searchParams, router]); // 👈 Also include `searchParams` in dependencies


  const handleGoogleLogin = () => {
    setIsGoogleLoading(true);
   window.location.href = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/v1/google/auth?flow=login`

  };

  const getErrorMessage = (errorCode: string) => {
    switch (errorCode) {
      case "account_not_found":
        return "No mentor account found with this Google account. Please sign up first.";
      case "oauth_failed":
        return "Google authentication failed. Please try again.";
      case "session_expired":
        return "Your session has expired. Please log in again.";
      default:
        return "An error occurred during login. Please try again.";
    }
  };

  return (
    <div className="min-h-screen bg-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-blue-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <Plane className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-blue-900">SkyMentor</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Login Form */}
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="max-w-md w-full mx-4">
          <Card className="border-blue-200 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-blue-900">
                Mentor Login
              </CardTitle>
              <CardDescription className="text-blue-700">
                Sign in to your SkyMentor account with Google
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Error Display */}
              {error && (
                <div className="flex items-center p-4 bg-red-50 border border-red-200 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-red-600 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-red-800 text-sm font-medium">
                      Login Failed
                    </p>
                    <p className="text-red-700 text-sm">
                      {getErrorMessage(error)}
                    </p>
                  </div>
                </div>
              )}

              {/* Google Login Button */}
              <Button
                onClick={handleGoogleLogin}
                disabled={isGoogleLoading}
                className="w-full h-12 bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-sm"
              >
                {isGoogleLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600 mr-3"></div>
                    Connecting to Google...
                  </>
                ) : (
                  <>
                    {/* Google Logo SVG */}
                    <svg className="mr-3 h-5 w-5" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Continue with Google
                  </>
                )}
              </Button>

              {/* Info Section */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start">
                  <LogIn className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-blue-900 text-sm font-medium mb-1">
                      Secure Login
                    </p>
                    <p className="text-blue-700 text-xs leading-relaxed">
                      We use Google OAuth for secure, one-click authentication.
                      Your Google account information is never stored on our
                      servers.
                    </p>
                  </div>
                </div>
              </div>

              {/* Navigation Links */}
              <div className="text-center space-y-3">
                <p className="text-blue-700 text-sm">
                  Don't have a mentor account?{" "}
                  <Link
                    href="/mentor/signup"
                    className="text-blue-900 hover:text-blue-800 hover:underline font-medium transition-colors"
                  >
                    Sign up here
                  </Link>
                </p>

                <div className="border-t border-blue-200 pt-3">
                  <Link
                    href="/"
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors inline-flex items-center"
                  >
                    <Plane className="h-4 w-4 mr-1" />
                    Back to main site
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Help */}
          <div className="mt-6 text-center">
            <p className="text-blue-600 text-xs">
              Need help? Contact us at{" "}
              <a
                href="mailto:support@skymentor.com"
                className="underline hover:text-blue-800"
              >
                support@skymentor.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
