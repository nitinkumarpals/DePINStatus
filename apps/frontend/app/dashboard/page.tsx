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
  Lock,
  Network,
  Plus,
  RefreshCcw,
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
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { useWebsite } from "@/hooks/useWebsite";
import { Skeleton } from "@/components/ui/skeleton";
import { API_BACKEND_URL } from "@/config";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ModeToggle } from "@/components/ModeToggle";

// Define the Website type to fix TypeScript errors
interface Website {
  id: string;
  url: string;
  ticks: {
    id: string;
    createdAt: Date;
    status: string;
    latency: number;
  }[];
}

interface Tick {
  id: string;
  createdAt: Date;
  status: string;
  latency: number;
}

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { websites, refreshWebsites } = useWebsite();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isAddingService, setIsAddingService] = useState(false);
  const [newWebsiteUrl, setNewWebsiteUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [urlError, setUrlError] = useState("");
  const { getToken } = useAuth();

  // Function to manually refresh websites
  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      // Call the refreshWebsites function from your hook
      // This is a workaround since the hook doesn't expose the function directly
      // In a real implementation, you might want to expose this function from the hook
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate refresh
      setIsRefreshing(false);
    } catch (error) {
      console.error("Failed to refresh websites:", error);
      setIsRefreshing(false);
    }
  };

  // Function to add a new website
  const handleAddWebsite = async () => {
    // Validate URL
    if (!newWebsiteUrl.trim()) {
      setUrlError("URL is required");
      return;
    }

    // Simple URL validation
    try {
      new URL(newWebsiteUrl);
    } catch {
      setUrlError("Please enter a valid URL (include http:// or https://)");
      return;
    }

    setIsSubmitting(true);
    setUrlError("");

    try {
      const token = await getToken();
      await axios.post(
        `${API_BACKEND_URL}/api/v1/website`,
        { url: newWebsiteUrl },
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      // Success - close modal and reset form
      setIsAddingService(false);
      setNewWebsiteUrl("");
      setIsSubmitting(false);

      // Show success toast
      toast("Website added successfully", {
        description: `Now monitoring ${newWebsiteUrl}`,
      });

      // Refresh the website list
      refreshWebsites();
    } catch (error) {
      console.error("Failed to add website:", error);
      setUrlError("Failed to add website. Please try again.");
      setIsSubmitting(false);
    }
  };

  // Filter websites based on search query
  const filteredWebsites =
    websites?.filter((website) =>
      website.url.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  // Calculate website status based on recent ticks
  const getWebsiteStatus = (website: Website): string => {
    if (!website.ticks || website.ticks.length === 0) return "unknown";

    // Get the last 5 ticks to determine current status
    const recentTicks = website.ticks.slice(0, 5);
    const failedTicks = recentTicks.filter(
      (tick) => tick.status === "Bad" || tick.status === "down"
    ).length;

    if (failedTicks === 0) return "up";
    if (failedTicks >= 3) return "down";
    return "degraded";
  };

  // Calculate uptime percentage
  const calculateUptime = (website: Website): string => {
    if (!website.ticks || website.ticks.length === 0) return "N/A";

    const totalTicks = website.ticks.length;
    const upTicks = website.ticks.filter(
      (tick) => tick.status === "Good" || tick.status === "up"
    ).length;

    const uptimePercentage = (upTicks / totalTicks) * 100;
    return uptimePercentage.toFixed(2) + "%";
  };

  // Get average response time
  const getAverageResponseTime = (website: Website): string => {
    if (!website.ticks || website.ticks.length === 0) return "N/A";

    const upTicks = website.ticks.filter(
      (tick) => tick.status === "Good" || tick.status === "up"
    );
    if (upTicks.length === 0) return "Error";

    const totalLatency = upTicks.reduce(
      (sum: number, tick: Tick) => sum + tick.latency,
      0
    );
    return Math.round(totalLatency / upTicks.length) + "ms";
  };

  // Get the last 30 minutes of ticks (or all if less than 30)
  const getLast30MinutesTicks = (website: Website): boolean[] => {
    if (!website.ticks || website.ticks.length === 0) return [];

    // Sort ticks by createdAt in descending order (newest first)
    const sortedTicks = [...website.ticks].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    // Get ticks from the last 30 minutes
    const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
    const recentTicks = sortedTicks.filter(
      (tick) => new Date(tick.createdAt) >= thirtyMinutesAgo
    );

    // Return up to 10 ticks for display, mapping Good to true and Bad to false
    return recentTicks
      .slice(0, 10)
      .map((tick) => tick.status === "Good" || tick.status === "up");
  };

  // Count websites by status
  const upCount =
    websites?.filter((site) => getWebsiteStatus(site) === "up")?.length || 0;

  const downCount =
    websites?.filter((site) => getWebsiteStatus(site) === "down")?.length || 0;

  const degradedCount =
    websites?.filter((site) => getWebsiteStatus(site) === "degraded")?.length ||
    0;

  return (
    <div className="flex min-h-screen flex-col">
      {/* Gradient background */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-black [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)] dark:[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#30f_100%)]"></div>
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
          <SignedIn>
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
                      <p className="text-sm text-muted-foreground">
                        Operational
                      </p>
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
                <div className="flex w-full sm:w-auto gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="gap-1"
                    onClick={handleRefresh}
                    disabled={isRefreshing}
                  >
                    <RefreshCcw
                      className={`h-3.5 w-3.5 ${isRefreshing ? "animate-spin" : ""}`}
                    />
                    <span>{isRefreshing ? "Refreshing..." : "Refresh"}</span>
                  </Button>
                  <Button
                    size="sm"
                    className="gap-1"
                    onClick={() => setIsAddingService(true)}
                  >
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

                {/* Desktop search */}
                <div className="p-4 hidden md:block">
                  <div className="relative w-full max-w-sm">
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
                  {websites?.length === 0 ? (
                    // Loading state
                    Array.from({ length: 3 }).map((_, index) => (
                      <div key={index} className="p-4">
                        <div className="flex items-center gap-3">
                          <Skeleton className="h-3 w-3 rounded-full" />
                          <div className="space-y-2">
                            <Skeleton className="h-5 w-40" />
                            <Skeleton className="h-3 w-24" />
                          </div>
                        </div>
                      </div>
                    ))
                  ) : filteredWebsites.length > 0 ? (
                    filteredWebsites.map((website) => {
                      const status = getWebsiteStatus(website);
                      const uptime = calculateUptime(website);
                      const responseTime = getAverageResponseTime(website);
                      const uptimeTicks = getLast30MinutesTicks(website);
                      const lastChecked =
                        website.ticks && website.ticks?.length > 0
                          ? new Date(
                              website.ticks[0].createdAt
                            ).toLocaleTimeString()
                          : "N/A";

                      return (
                        <Accordion type="single" collapsible key={website.id}>
                          <AccordionItem
                            value={`item-${website.id}`}
                            className="border-0"
                          >
                            <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted/50">
                              <div className="flex items-center gap-3 text-left">
                                <div
                                  className={`h-3 w-3 rounded-full ${
                                    status === "up"
                                      ? "bg-green-500"
                                      : status === "down"
                                        ? "bg-red-500"
                                        : status === "degraded"
                                          ? "bg-amber-500"
                                          : "bg-gray-500"
                                  }`}
                                />
                                <div>
                                  <div className="font-medium">
                                    {website.url}
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    ID: {website.id}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-6 mr-4">
                                <div className="text-right">
                                  <div className="text-sm font-medium">
                                    {uptime}
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    Uptime
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="text-sm font-medium">
                                    {responseTime}
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
                                    {uptimeTicks.length > 0 ? (
                                      uptimeTicks.map((isUp, index) => (
                                        <div
                                          key={index}
                                          className={`h-8 w-6 rounded ${isUp ? "bg-green-500" : "bg-red-500"}`}
                                        />
                                      ))
                                    ) : (
                                      <p className="text-sm text-muted-foreground">
                                        No data available for the last 30
                                        minutes
                                      </p>
                                    )}
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
                                          status === "up"
                                            ? "bg-green-500"
                                            : status === "down"
                                              ? "bg-red-500"
                                              : status === "degraded"
                                                ? "bg-amber-500"
                                                : "bg-gray-500"
                                        }`}
                                      />
                                      <span className="font-medium capitalize">
                                        {status}
                                      </span>
                                    </div>
                                  </div>
                                  <div>
                                    <div className="text-xs text-muted-foreground">
                                      Uptime
                                    </div>
                                    <div className="font-medium">{uptime}</div>
                                  </div>
                                  <div>
                                    <div className="text-xs text-muted-foreground">
                                      Response Time
                                    </div>
                                    <div className="font-medium">
                                      {responseTime}
                                    </div>
                                  </div>
                                  <div>
                                    <div className="text-xs text-muted-foreground">
                                      Last Checked
                                    </div>
                                    <div className="font-medium">
                                      {lastChecked}
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
                      );
                    })
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
          </SignedIn>

          <SignedOut>
            <div className="container py-12 flex flex-col items-center justify-center text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted mb-6">
                <Lock className="h-10 w-10 text-muted-foreground" />
              </div>
              <h1 className="text-3xl font-bold tracking-tight mb-2">
                Authentication Required
              </h1>
              <p className="text-muted-foreground max-w-md mb-8">
                Please sign in to access the dashboard and monitor your DePIN
                services.
              </p>
              <div className="flex gap-4">
                <Link href="/">
                  <Button variant="outline" size="lg">
                    Back to Home
                  </Button>
                </Link>
              </div>
            </div>
          </SignedOut>
        </main>
      </div>

      {/* Add Service Dialog */}
      <Dialog open={isAddingService} onOpenChange={setIsAddingService}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Service</DialogTitle>
            <DialogDescription>
              Enter the URL of the website or service you want to monitor.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="url">Service URL</Label>
              <Input
                id="url"
                placeholder="https://example.com"
                value={newWebsiteUrl}
                onChange={(e) => {
                  setNewWebsiteUrl(e.target.value);
                  setUrlError("");
                }}
                className={urlError ? "border-red-500" : ""}
              />
              {urlError && <p className="text-sm text-red-500">{urlError}</p>}
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAddingService(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button onClick={handleAddWebsite} disabled={isSubmitting}>
              {isSubmitting ? "Adding..." : "Add Service"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
