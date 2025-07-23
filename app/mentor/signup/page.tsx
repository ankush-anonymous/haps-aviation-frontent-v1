// "use client" directive is necessary for client-side components in Next.js 13+ App Router
"use client";

// Import necessary icons from lucide-react
import { Plane, LogIn, AlertCircle } from "lucide-react";

// Import UI components (assuming these are from shadcn/ui or similar)
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";

// Import Next.js navigation components
import Link from "next/link";
import { useRouter } from "next/navigation";


// Define the MentorSignup functional component
export default function MentorSignup() {
  // Initialize the Next.js router for programmatic navigation (though not directly used in this specific function)
  const router = useRouter();

  /**
   * Handles the Google signup process.
   * Redirects the user to the backend's Google OAuth initiation endpoint.
   */
  const handleGoogleSignup = async () => {
    // Retrieve the base URL for your API from environment variables.
    // This should be set in your .env.local file (e.g., NEXT_PUBLIC_API_BASE_URL=http://localhost:3000)
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL||"http://localhost:5000";

    // Construct the full URL for the Google OAuth initiation endpoint.
    // This URL must match the route defined in your backend (e.g., /auth/google).
    // The previous server code uses '/auth/google', so we adjust the frontend path accordingly.
window.location.href = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/v1/google/auth?flow=signup`
  };

  return (
    <div className="min-h-screen bg-blue-50 font-inter"> {/* Added font-inter class */}
      {/* Header Section */}
      <header className="bg-white border-b border-blue-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-16">
            {/* Logo and App Name */}
            <Link href="/" className="flex items-center space-x-2">
              <Plane className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-blue-900">SkyMentor</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Area - Centered Signup Card */}
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-4"> {/* Added p-4 for mobile padding */}
        <div className="max-w-md w-full">
          <Card className="border-blue-200 shadow-lg rounded-xl overflow-hidden"> {/* Added rounded-xl and overflow-hidden */}
            <CardHeader className="text-center p-6 bg-blue-50 border-b border-blue-100"> {/* Added padding and background */}
              <CardTitle className="text-3xl font-extrabold text-blue-900 mb-2">Mentor Signup</CardTitle> {/* Increased font size and weight */}
              <CardDescription className="text-blue-700 text-base"> {/* Adjusted font size */}
                Get started with your Google account
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6 p-6"> {/* Added padding */}

              {/* Google Signup Button */}
              <Button
                onClick={handleGoogleSignup}
                className="w-full h-12 bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400
                           transition-all duration-200 shadow-sm rounded-lg flex items-center justify-center
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" // Added focus styles
              >
                {/* Google logo SVG */}
                <svg className="mr-3 h-5 w-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Sign up with Google
              </Button>

              {/* Secure Info Section */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start">
                  <LogIn className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-blue-900 text-sm font-medium mb-1">Secure Signup</p>
                    <p className="text-blue-700 text-xs leading-relaxed">
                      We use Google OAuth to protect your identity. No passwords, no spam — just easy onboarding.
                    </p>
                  </div>
                </div>
              </div>

              {/* Navigation Links */}
              <div className="text-center space-y-3 pt-2"> {/* Added pt-2 */}
                <p className="text-blue-700 text-sm">
                  Already have an account?{" "}
                  <Link href="/mentor/login" className="text-blue-900 hover:text-blue-800 hover:underline font-medium">
                    Login here
                  </Link>
                </p>
                <div className="border-t border-blue-200 pt-3">
                  <Link
                    href="/"
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium inline-flex items-center"
                  >
                    <Plane className="h-4 w-4 mr-1" />
                    Back to main site
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Help/Support Link */}
          <div className="mt-6 text-center">
            <p className="text-blue-600 text-xs">
              Questions?{" "}
              <a href="mailto:support@skymentor.com" className="underline hover:text-blue-800">
                support@skymentor.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
