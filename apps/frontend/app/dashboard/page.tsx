"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Activity,
  AlertCircle,
  Bell,
  ChevronDown,
  Clock,
  Filter,
  Globe,
  Home,
  Network,
  Plus,
  Search,
  Settings,
  Shield,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "@/components/ModeToggle";

// Mock data for websites/services
const websites = [
  {
    id: 1,
    name: "Main API Gateway",
    url: "api.example.com",
    status: "up", // up or down
    uptime: "99.98%",
    responseTime: "42ms",
    lastChecked: "2 minutes ago",
    uptimeTicks: [true, true, true, true, true, true, true, true, true, true],
  },
  {
    id: 2,
    name: "User Authentication Service",
    url: "auth.example.com",
    status: "up",
    uptime: "99.95%",
    responseTime: "67ms",
    lastChecked: "1 minute ago",
    uptimeTicks: [true, true, true, true, true, true, true, true, true, true],
  },
  {
    id: 3,
    name: "Payment Processing API",
    url: "payments.example.com",
    status: "down",
    uptime: "98.72%",
    responseTime: "Error",
    lastChecked: "3 minutes ago",
    uptimeTicks: [true, true, true, false, false, true, true, true, true, true],
  },
  {
    id: 4,
    name: "Content Delivery Network",
    url: "cdn.example.com",
    status: "up",
    uptime: "99.99%",
    responseTime: "28ms",
    lastChecked: "Just now",
    uptimeTicks: [true, true, true, true, true, true, true, true, true, true],
  },
  {
    id: 5,
    name: "Database Cluster",
    url: "db.example.com",
    status: "up",
    uptime: "99.91%",
    responseTime: "54ms",
    lastChecked: "4 minutes ago",
    uptimeTicks: [true, true, true, true, true, true, true, true, true, true],
  },
  {
    id: 6,
    name: "Analytics Service",
    url: "analytics.example.com",
    status: "degraded",
    uptime: "99.45%",
    responseTime: "187ms",
    lastChecked: "2 minutes ago",
    uptimeTicks: [true, true, false, true, true, true, false, true, true, true],
  },
  {
    id: 7,
    name: "Storage Service",
    url: "storage.example.com",
    status: "up",
    uptime: "99.97%",
    responseTime: "62ms",
    lastChecked: "5 minutes ago",
    uptimeTicks: [true, true, true, true, true, true, true, true, true, true],
  },
];

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter websites based on search query
  const filteredWebsites = websites.filter(
    (website) =>
      website.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      website.url.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Count websites by status
  const upCount = websites.filter((site) => site.status === "up").length;
  const downCount = websites.filter((site) => site.status === "down").length;
  const degradedCount = websites.filter(
    (site) => site.status === "degraded"
  ).length;

  return (
    <div className="flex min-h-screen flex-col">
      {/* Gradient background */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>

      <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between mx-14">
          <div className="flex gap-2 items-center text-xl font-bold">
            <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Network className="h-4 w-4" />
              <span className="absolute -right-1 -top-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
              </span>
            </div>
            <Link href="/">
              <span>DePIN Pulse</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden md:flex w-full max-w-sm items-center">
              <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="pl-8 w-[300px] bg-background"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
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
            <ModeToggle />
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="hidden md:flex w-64 flex-col border-r bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex flex-col gap-2 p-4">
            <div className="flex items-center gap-2 rounded-md bg-muted/50 px-3 py-2 text-muted-foreground">
              <Home className="h-4 w-4" />
              <span className="text-sm font-medium">Dashboard</span>
            </div>
            <div className="flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted/50">
              <Activity className="h-4 w-4" />
              <span className="text-sm font-medium">Monitoring</span>
            </div>
            <div className="flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted/50">
              <Bell className="h-4 w-4" />
              <span className="text-sm font-medium">Alerts</span>
            </div>
            <div className="flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted/50">
              <Shield className="h-4 w-4" />
              <span className="text-sm font-medium">Security</span>
            </div>
            <div className="flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted/50">
              <Settings className="h-4 w-4" />
              <span className="text-sm font-medium">Settings</span>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-auto">
          <div className="container py-6">
            <div className="mb-8">
              <h1 className="text-3xl font-bold tracking-tight">
                Status Dashboard
              </h1>
              <p className="text-muted-foreground">
                Monitor the status of your DePIN services in real-time
              </p>
            </div>

            {/* Status overview */}
            <div className="grid gap-4 md:grid-cols-3 mb-8">
              <div className="rounded-lg border bg-card p-4 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/10">
                    <div className="h-5 w-5 rounded-full bg-green-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Operational</p>
                    <p className="text-2xl font-bold">{upCount} services</p>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border bg-card p-4 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500/10">
                    <div className="h-5 w-5 rounded-full bg-amber-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Degraded</p>
                    <p className="text-2xl font-bold">
                      {degradedCount} services
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border bg-card p-4 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500/10">
                    <div className="h-5 w-5 rounded-full bg-red-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Down</p>
                    <p className="text-2xl font-bold">{downCount} services</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <Filter className="h-3.5 w-3.5" />
                  <span>Filter</span>
                </Button>
                <Button variant="outline" size="sm" className="h-8">
                  <Clock className="mr-1 h-3.5 w-3.5" />
                  <span>Last 24 hours</span>
                  <ChevronDown className="ml-1 h-3.5 w-3.5" />
                </Button>
              </div>
              <div className="flex w-full sm:w-auto">
                <Button size="sm" className="gap-1">
                  <Plus className="h-3.5 w-3.5" />
                  <span>Add Service</span>
                </Button>
              </div>
            </div>

            {/* Services list with accordions */}
            <div className="rounded-lg border bg-card shadow">
              <div className="flex items-center justify-between border-b px-4 py-3">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <h2 className="font-semibold">Monitored Services</h2>
                </div>
                <div className="text-sm text-muted-foreground">
                  {filteredWebsites.length} services
                </div>
              </div>

              {/* Mobile search */}
              <div className="p-4 md:hidden">
                <div className="relative w-full">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search services..."
                    className="pl-8 w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {/* Services accordion list */}
              <div className="divide-y">
                {filteredWebsites.length > 0 ? (
                  filteredWebsites.map((website) => (
                    <Accordion type="single" collapsible key={website.id}>
                      <AccordionItem
                        value={`item-${website.id}`}
                        className="border-0"
                      >
                        <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted/50">
                          <div className="flex items-center gap-3 text-left">
                            <div
                              className={`h-3 w-3 rounded-full ${
                                website.status === "up"
                                  ? "bg-green-500"
                                  : website.status === "down"
                                    ? "bg-red-500"
                                    : "bg-amber-500"
                              }`}
                            />
                            <div>
                              <div className="font-medium">{website.name}</div>
                              <div className="text-xs text-muted-foreground">
                                {website.url}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-6 mr-4">
                            <div className="text-right">
                              <div className="text-sm font-medium">
                                {website.uptime}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                Uptime
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-medium">
                                {website.responseTime}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                Response
                              </div>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-4 pt-0">
                          <div className="rounded-md border bg-card p-4">
                            <div className="mb-4">
                              <h4 className="text-sm font-medium mb-2">
                                Last 30 minutes status
                              </h4>
                              <div className="flex gap-1">
                                {website.uptimeTicks.map((isUp, index) => (
                                  <div
                                    key={index}
                                    className={`h-8 w-6 rounded ${isUp ? "bg-green-500" : "bg-red-500"}`}
                                  />
                                ))}
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                              <div>
                                <div className="text-xs text-muted-foreground">
                                  Status
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <div
                                    className={`h-2 w-2 rounded-full ${
                                      website.status === "up"
                                        ? "bg-green-500"
                                        : website.status === "down"
                                          ? "bg-red-500"
                                          : "bg-amber-500"
                                    }`}
                                  />
                                  <span className="font-medium capitalize">
                                    {website.status}
                                  </span>
                                </div>
                              </div>
                              <div>
                                <div className="text-xs text-muted-foreground">
                                  Uptime
                                </div>
                                <div className="font-medium">
                                  {website.uptime}
                                </div>
                              </div>
                              <div>
                                <div className="text-xs text-muted-foreground">
                                  Response Time
                                </div>
                                <div className="font-medium">
                                  {website.responseTime}
                                </div>
                              </div>
                              <div>
                                <div className="text-xs text-muted-foreground">
                                  Last Checked
                                </div>
                                <div className="font-medium">
                                  {website.lastChecked}
                                </div>
                              </div>
                            </div>
                            <div className="mt-4 flex justify-end gap-2">
                              <Button variant="outline" size="sm">
                                View Details
                              </Button>
                              <Button size="sm">Check Now</Button>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <AlertCircle className="h-12 w-12 text-muted-foreground/50 mb-4" />
                    <h3 className="text-lg font-medium">No services found</h3>
                    <p className="text-muted-foreground mt-1">
                      No services match your search criteria
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
