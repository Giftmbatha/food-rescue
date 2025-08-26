import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 text-balance">
            Welcome to <span className="text-primary">Food Rescue</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            Connect donors and NGOs to reduce food waste and fight hunger in our communities
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8 py-6">
              <Link href="/listings">Browse Food Listings</Link>
            </Button>
            <Button asChild variant="secondary" size="lg" className="text-lg px-8 py-6">
              <Link href="/donate">Donate Food</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 px-6 bg-secondary/20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">10,000+</div>
              <div className="text-muted-foreground">Meals Rescued</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">Active Donors</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">50+</div>
              <div className="text-muted-foreground">Partner NGOs</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-foreground mb-16">How Food Rescue Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center border-border">
              <CardHeader>
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-primary-foreground">🍽️</span>
                </div>
                <CardTitle className="text-xl">Donate Surplus Food</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Restaurants, grocery stores, and individuals can easily list surplus food that would otherwise go to
                  waste.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-border">
              <CardHeader>
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-secondary-foreground">🤝</span>
                </div>
                <CardTitle className="text-xl">Connect with NGOs</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Our platform matches food donations with local NGOs and charities that can distribute them to those in
                  need.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-border">
              <CardHeader>
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-accent-foreground">❤️</span>
                </div>
                <CardTitle className="text-xl">Feed Communities</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Together, we ensure nutritious food reaches families and individuals who need it most, reducing waste
                  and hunger.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Join the Fight Against Food Waste</h2>
          <p className="text-xl mb-8 opacity-90 text-pretty">
            Every meal saved makes a difference. Whether you're a donor or an NGO, you can help create a more
            sustainable and caring community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="secondary" size="lg" className="text-lg px-8 py-6">
              <Link href="/register">Get Started Today</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
            >
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

