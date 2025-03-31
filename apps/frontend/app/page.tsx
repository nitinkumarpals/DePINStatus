import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Activity,
  AlertCircle,
  ArrowRight,
  CheckCircle,
  Clock,
  Database,
  Globe,
  LineChart,
  Network,
  Shield,
} from "lucide-react";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "@/components/ModeToggle";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Gradient background */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>

      <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 ">
        <div className="container flex h-16 items-center justify-between mx-14">
          <div className="flex gap-2 items-center text-xl font-bold">
            <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Network className="h-4 w-4" />
              <span className="absolute -right-1 -top-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
              </span>
            </div>
            <span>DePIN Pulse</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="#features"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Features
            </Link>
            <Link
              href="#dashboard"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Dashboard
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Pricing
            </Link>
            <Link
              href="#docs"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Documentation
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <SignInButton>
                <Button
                  variant="ghost"
                  size="sm"
                  className="hidden md:flex hover:cursor-pointer"
                >
                  Sign In
                </Button>
              </SignInButton>
              <SignUpButton>
                <Button
                  variant="ghost"
                  size="sm"
                  className="hidden md:flex hover:cursor-pointer"
                >
                  Sign up
                </Button>
              </SignUpButton>
            </SignedOut>
            <ModeToggle/>            
            <Button variant="outline" size="icon" className="md:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-40">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm">
                <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                <span>Monitoring 1,200+ DePIN Networks</span>
              </div>
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-purple-700 via-violet-600 to-indigo-700">
                Real-Time Visibility for Your DePIN Infrastructure
              </h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl lg:text-2xl">
                Comprehensive monitoring and alerting for all your decentralized
                physical infrastructure networks in one powerful dashboard.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 min-w-[380px] justify-center">
                <Link href="/dashboard">
                  <Button
                    size="lg"
                    className="h-12 px-8 text-base bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-800 hover:to-indigo-800"
                  >
                    Start Monitoring
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 px-8 text-base"
                >
                  Watch Demo
                </Button>
              </div>
              <div className="mt-8 text-center text-sm text-muted-foreground">
                <p>Trusted by leading DePIN projects worldwide</p>
                <div className="mt-4 flex flex-wrap justify-center gap-8">
                  <div className="flex items-center justify-center">
                    <Image
                      src="/placeholder.svg?height=30&width=120"
                      width={120}
                      height={30}
                      alt="Company logo"
                      className="opacity-70 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                  <div className="flex items-center justify-center">
                    <Image
                      src="/placeholder.svg?height=30&width=120"
                      width={120}
                      height={30}
                      alt="Company logo"
                      className="opacity-70 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                  <div className="flex items-center justify-center">
                    <Image
                      src="/placeholder.svg?height=30&width=120"
                      width={120}
                      height={30}
                      alt="Company logo"
                      className="opacity-70 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                  <div className="flex items-center justify-center">
                    <Image
                      src="/placeholder.svg?height=30&width=120"
                      width={120}
                      height={30}
                      alt="Company logo"
                      className="opacity-70 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dashboard Preview */}
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="relative mx-auto max-w-6xl overflow-hidden rounded-2xl border shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 via-transparent to-blue-500/10"></div>
              <Image
                src="/placeholder.svg?height=800&width=1400"
                width={1400}
                height={800}
                alt="Dashboard preview"
                className="w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8 grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center justify-center rounded-xl bg-background/90 p-4 backdrop-blur shadow-lg">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-500/10 mb-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                  <p className="text-sm font-medium">99.8% Uptime</p>
                </div>
                <div className="flex flex-col items-center justify-center rounded-xl bg-background/90 p-4 backdrop-blur shadow-lg">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-500/10 mb-2">
                    <Activity className="h-5 w-5 text-blue-500" />
                  </div>
                  <p className="text-sm font-medium">1,248 Nodes</p>
                </div>
                <div className="flex flex-col items-center justify-center rounded-xl bg-background/90 p-4 backdrop-blur shadow-lg">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-amber-500/10 mb-2">
                    <AlertCircle className="h-5 w-5 text-amber-500" />
                  </div>
                  <p className="text-sm font-medium">3 Active Alerts</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm">
                <span className="text-primary font-medium">
                  Powerful Features
                </span>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Everything You Need to Monitor Your DePIN Networks
              </h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Our platform provides comprehensive tools to ensure your
                decentralized infrastructure operates at peak performance.
              </p>
            </div>

            <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* Feature 1 */}
              <div className="group relative overflow-hidden rounded-2xl border bg-background p-6 shadow-md transition-all hover:shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                  <Activity className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Real-Time Monitoring</h3>
                <p className="mt-2 text-muted-foreground">
                  Get instant visibility into the status and health of your
                  entire DePIN network with real-time updates.
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    <span className="text-sm">Live node status tracking</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    <span className="text-sm">
                      Continuous performance metrics
                    </span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    <span className="text-sm">Instant status changes</span>
                  </li>
                </ul>
              </div>

              {/* Feature 2 */}
              <div className="group relative overflow-hidden rounded-2xl border bg-background p-6 shadow-md transition-all hover:shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                  <LineChart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Advanced Analytics</h3>
                <p className="mt-2 text-muted-foreground">
                  Gain deep insights into your network&apos;s performance with
                  comprehensive analytics and visualizations.
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    <span className="text-sm">
                      Interactive performance charts
                    </span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    <span className="text-sm">Historical data analysis</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    <span className="text-sm">Custom reporting tools</span>
                  </li>
                </ul>
              </div>

              {/* Feature 3 */}
              <div className="group relative overflow-hidden rounded-2xl border bg-background p-6 shadow-md transition-all hover:shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                  <AlertCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Intelligent Alerts</h3>
                <p className="mt-2 text-muted-foreground">
                  Receive proactive notifications about potential issues before
                  they impact your network.
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    <span className="text-sm">
                      Customizable alert thresholds
                    </span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    <span className="text-sm">Multi-channel notifications</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    <span className="text-sm">Anomaly detection</span>
                  </li>
                </ul>
              </div>

              {/* Feature 4 */}
              <div className="group relative overflow-hidden rounded-2xl border bg-background p-6 shadow-md transition-all hover:shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                  <Database className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Network Topology</h3>
                <p className="mt-2 text-muted-foreground">
                  Visualize your entire DePIN network structure with interactive
                  topology maps.
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    <span className="text-sm">Interactive network maps</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    <span className="text-sm">
                      Node relationship visualization
                    </span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    <span className="text-sm">Geographic distribution</span>
                  </li>
                </ul>
              </div>

              {/* Feature 5 */}
              <div className="group relative overflow-hidden rounded-2xl border bg-background p-6 shadow-md transition-all hover:shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Security Monitoring</h3>
                <p className="mt-2 text-muted-foreground">
                  Protect your DePIN network with advanced security monitoring
                  and threat detection.
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    <span className="text-sm">Threat detection</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    <span className="text-sm">Vulnerability scanning</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    <span className="text-sm">Security incident alerts</span>
                  </li>
                </ul>
              </div>

              {/* Feature 6 */}
              <div className="group relative overflow-hidden rounded-2xl border bg-background p-6 shadow-md transition-all hover:shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">API Integration</h3>
                <p className="mt-2 text-muted-foreground">
                  Seamlessly integrate with your existing tools and workflows
                  through our robust API.
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    <span className="text-sm">RESTful API access</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    <span className="text-sm">Webhook support</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    <span className="text-sm">Custom integrations</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Dashboard Section */}
        <section
          id="dashboard"
          className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden"
        >
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(var(--purple-500),0.1),transparent_50%)]"></div>
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm">
                <span className="text-primary font-medium">
                  Interactive Dashboard
                </span>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Powerful Visualization for Your DePIN Networks
              </h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Our intuitive dashboard provides a comprehensive view of your
                entire DePIN ecosystem.
              </p>
            </div>

            <div className="mt-16 grid gap-8 md:grid-cols-2 items-center">
              <div className="space-y-4">
                <div className="group relative overflow-hidden rounded-xl border bg-background p-6 shadow-md transition-all hover:shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Activity className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">
                        Real-Time Network Status
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Monitor the status and health of all nodes in your
                        network in real-time.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group relative overflow-hidden rounded-xl border bg-background p-6 shadow-md transition-all hover:shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <LineChart className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">
                        Interactive Performance Charts
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Visualize performance metrics with interactive charts
                        and graphs.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group relative overflow-hidden rounded-xl border bg-background p-6 shadow-md transition-all hover:shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <AlertCircle className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">Alert Management</h3>
                      <p className="text-sm text-muted-foreground">
                        Manage and respond to alerts from a centralized
                        dashboard.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group relative overflow-hidden rounded-xl border bg-background p-6 shadow-md transition-all hover:shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">
                        Historical Data Analysis
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Analyze historical performance data to identify trends
                        and optimize your network.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="relative overflow-hidden rounded-2xl border shadow-xl">
                  <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 via-transparent to-blue-500/10"></div>
                  <Image
                    src="/placeholder.svg?height=600&width=800"
                    width={800}
                    height={600}
                    alt="Dashboard interface"
                    className="w-full"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 h-64 w-64 bg-purple-500/20 rounded-full blur-3xl -z-10"></div>
                <div className="absolute -top-6 -left-6 h-64 w-64 bg-blue-500/20 rounded-full blur-3xl -z-10"></div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Monitor Your DePIN Network?
              </h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Get started today and gain complete visibility into your
                decentralized infrastructure.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 min-w-[380px] justify-center mt-6">
                <Link href="/dashboard">
                  <Button
                    size="lg"
                    className="h-12 px-8 text-base bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-800 hover:to-indigo-800"
                  >
                    Start Monitoring
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 px-8 text-base"
                >
                  Contact Sales
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full bg-background border-t">
        <div className="container px-4 py-12 md:py-16 md:px-6">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
            <div className="col-span-2 lg:col-span-2">
              <div className="flex gap-2 items-center text-xl font-bold mb-4">
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Network className="h-4 w-4" />
                </div>
                <span>DePIN Pulse</span>
              </div>
              <p className="text-muted-foreground max-w-xs">
                Comprehensive monitoring and alerting for all your decentralized
                physical infrastructure networks.
              </p>
              <div className="flex space-x-4 mt-6">
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <rect
                      width="20"
                      height="20"
                      x="2"
                      y="2"
                      rx="5"
                      ry="5"
                    ></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                  </svg>
                </Link>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-4">Product</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Roadmap
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-4">Resources</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    API Reference
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Guides
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Support
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-4">Company</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-muted-foreground">
                &copy; {new Date().getFullYear()} DePIN Pulse. All rights
                reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <Link
                  href="#"
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="#"
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  Terms of Service
                </Link>
                <Link
                  href="#"
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  Cookie Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
