import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Target, Award, Globe } from "lucide-react"
import Image from "next/image"

export default function AboutPage() {
  const stats = [
    { number: "500+", label: "Successful Mentorships" },
    { number: "50+", label: "Expert Mentors" },
    { number: "95%", label: "Success Rate" },
    { number: "24/7", label: "Support Available" },
  ]

  const mentors = [
    {
      name: "Captain Sarah Johnson",
      title: "Commercial Airline Pilot",
      experience: "15+ years",
      specialties: ["Commercial Aviation", "Flight Training", "Career Transition"],
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Captain Mike Rodriguez",
      title: "Former Air Force Pilot",
      experience: "20+ years",
      specialties: ["Military Aviation", "Leadership", "Safety Management"],
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Captain Lisa Chen",
      title: "Flight Instructor & Examiner",
      experience: "12+ years",
      specialties: ["Flight Training", "Certification", "Private Aviation"],
      image: "/placeholder.svg?height=300&width=300",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">About SkyMentor</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Connecting aspiring aviators with industry experts to accelerate careers and build the future of aviation
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6">Our Mission</h2>
              <p className="text-lg text-blue-700 mb-6">
                At SkyMentor, we believe that every aspiring aviator deserves access to world-class mentorship. Our
                platform bridges the gap between experienced professionals and the next generation of aviation leaders.
              </p>
              <p className="text-lg text-blue-700 mb-8">
                We're committed to fostering a community where knowledge is shared, careers are accelerated, and the
                aviation industry continues to thrive through exceptional talent development.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <Target className="h-12 w-12 text-blue-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-blue-900">Focused Guidance</h3>
                </div>
                <div className="text-center">
                  <Globe className="h-12 w-12 text-blue-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-blue-900">Global Network</h3>
                </div>
              </div>
            </div>
            <div>
              <Image
                src="/placeholder.svg?height=500&width=600"
                alt="Aviation team meeting"
                width={600}
                height={500}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">Our Impact</h2>
            <p className="text-xl text-blue-700">Numbers that speak to our commitment to excellence</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-blue-800 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">Meet Our Expert Mentors</h2>
            <p className="text-xl text-blue-700 max-w-3xl mx-auto">
              Our mentors are industry veterans with decades of experience across all sectors of aviation
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {mentors.map((mentor, index) => (
              <Card key={index} className="border-blue-200 hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <Image
                    src={mentor.image || "/placeholder.svg"}
                    alt={mentor.name}
                    width={300}
                    height={300}
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                  />
                  <CardTitle className="text-blue-900">{mentor.name}</CardTitle>
                  <CardDescription className="text-blue-700">
                    {mentor.title} • {mentor.experience}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {mentor.specialties.map((specialty, idx) => (
                      <Badge key={idx} variant="secondary" className="bg-blue-100 text-blue-800">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-r from-blue-800 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-xl text-blue-100">The principles that guide everything we do</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <Award className="h-16 w-16 text-blue-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4">Excellence</h3>
              <p className="text-blue-100">
                We maintain the highest standards in everything we do, from mentor selection to program delivery.
              </p>
            </div>
            <div className="text-center">
              <Users className="h-16 w-16 text-blue-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4">Community</h3>
              <p className="text-blue-100">
                We foster a supportive community where knowledge sharing and collaboration drive success.
              </p>
            </div>
            <div className="text-center">
              <Target className="h-16 w-16 text-blue-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4">Impact</h3>
              <p className="text-blue-100">
                We measure our success by the careers we help launch and the industry we help strengthen.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
