import { Card, CardContent } from "@/components/ui/card"
import { Heart, Target, Users, Zap } from "lucide-react"
import logo from "../../components/images/robot-image.png"
import { Link } from "react-router-dom"
import { useEffect } from "react"
import Aos from "aos"

export const AboutUsTab = () => {
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "Mike Chen",
      role: "CTO",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "Emily Davis",
      role: "Head of Design",
      image: "/placeholder.svg?height=200&width=200",
    },
  ]

  const values = [
    {
      icon: Heart,
      title: "Passion",
      description: "We love what we do and it shows in every project we deliver.",
    },
    {
      icon: Target,
      title: "Excellence",
      description: "We strive for perfection in every detail and never settle for less.",
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "We believe great things happen when talented people work together.",
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "We're always looking for new ways to solve problems and create value.",
    },
  ]

  useEffect(() => {
      Aos.init({
        duration: 1000,  
        once: true   
      });
    }, [])
  return (
    <div className="min-h-screen bg-[#04152d]">
      {/* Hero Section */}
      <section data-aos="zoom-in" className="py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold text-white mb-6">About Us</h1>
          <p className="text-xl text-white max-w-3xl mx-auto">
            We're a passionate team dedicated to creating amazing experiences and solving complex problems through
            innovative solutions.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section data-aos="fade-up" className="bg-[#030f22] py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
              <p className="text-gray-300 mb-4">
                Founded in 2020, WeEngineer began with a simple mission: to make engineering education more accessible, collaborative, and resource-rich for every student.
                What started as a single passionate developer has evolved into a vibrant community of learners, creators, and problem-solver committed to sharing
                knowledge, simplifying learning, and empowering the next generation of engineers.
              </p>
              <p className="text-gray-300 mb-6">
                Today, we're proud to support thousands of engineering students across the country, helping them learn smarter, share resources, and grow together through 
                our innovative platform.Our journey is just getting started and we're excited to keep building a future where knowledge is truly for everyone.
              </p>
              {/* <Button className="bg-blue-600 hover:bg-blue-700">Learn More About Our Mission</Button> */}
            </div>
            <div>
              <img
                src={logo}
                alt="Our team working together"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section data-aos="zoom-in" className="py-20 bg-[#04152d]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Our Values</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              These core values guide everything we do and shape the way we work with our clients and each other.
            </p>
          </div>

          <div data-aos="fade-up" className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon
              return (
                <Card key={index} className="bg-[#030f22] text-center p-6 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">{value.title}</h3>
                    <p className="text-gray-300">{value.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div data-aos="zoom-in" className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Meet Our Team</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Get to know the talented individuals who make our company what it is today.
            </p>
          </div>

          <div data-aos="fade-up" className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="bg-[#030f22] text-center overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <img
                    src={logo}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-semibold text-gray-300 mb-2">{member.name}</h3>
                  <p className="text-blue-600 font-medium">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Work With Us?</h2>
          <p className="text-blue-100 mb-8 text-lg">
            We'd love to hear about your project and discuss how we can help bring your ideas to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="mailto:yashassalian40@gmail.com">
                <div className="bg-white text-[#030f22] rounded-lg p-2">
                Get In Touch
                </div>
            </Link>
            <Link to="https://github.com/yashas-salian">
                <div className="bg-white text-[#030f22] rounded-lg p-2">
                View My Work
                </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
