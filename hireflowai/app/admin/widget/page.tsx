"use client";

import { useEffect, useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";

import { Plus, Copy, Check, X, Loader2 } from "lucide-react";

import {
  getWidget,
  createWidget as createWidgetAction,
  addAllowedDomain,
  removeAllowedDomain,
} from "@/action/widget";

import { toggleWidget } from "@/action/widgettoggle";

type Widget = {
  id: string;
  widgetId: string | null;
  widgetName: string | null;
  isActive: boolean;
  allowedDomains: string[];
};

export default function WidgetPage() {
  /* =======================================================
     STATE
  ======================================================= */

  const [widget, setWidget] = useState<Widget | null>(null);

  const [loading, setLoading] = useState(true);

  const [createOpen, setCreateOpen] = useState(false);

  const [widgetName, setWidgetName] = useState("empty");

  const [domainInput, setDomainInput] = useState("");

  const [allowedDomains, setAllowedDomains] = useState<string[]>([]);

  const [copied, setCopied] = useState(false);

  const [creating, setCreating] = useState(false);

  const [addingDomain, setAddingDomain] = useState(false);

  const [removingDomain, setRemovingDomain] = useState<string | null>(null);

  const [toggling, setToggling] = useState(false);

  const [error, setError] = useState<string | null>(null);

  /* =======================================================
     LOAD EXISTING WIDGET
  ======================================================= */

  useEffect(() => {
    async function loadWidget() {
      try {
        setLoading(true);
        setError(null);

        const existingWidget = await getWidget();

        if (!existingWidget) {
          setWidget(null);
          setAllowedDomains([]);
          return;
        }

        setWidget(existingWidget);
        setAllowedDomains(existingWidget.allowedDomains ?? []);
      } catch (error) {
        console.error("Failed to load widget:", error);

        setError(
          error instanceof Error ? error.message : "Failed to load widget.",
        );
      } finally {
        setLoading(false);
      }
    }

    loadWidget();
  }, []);

  /* =======================================================
     EMBED SCRIPT
  ======================================================= */

  const script = widget?.widgetId
    ? `<script
    src="http://localhost:3000/widget.js"
    data-widget-id="${widget.widgetId}"
  ></script>
`
    : "";

  /* =======================================================
     COPY SCRIPT
  ======================================================= */

  async function copyScript() {
    if (!script) return;

    try {
      await navigator.clipboard.writeText(script);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Copy failed:", error);

      setError("Failed to copy script.");
    }
  }

  /* =======================================================
     NORMALIZE DOMAIN
  ======================================================= */

  function normalizeDomain(value: string) {
    return value;
  }

  /* =======================================================
     ADD DOMAIN TO CREATE LIST
  ======================================================= */

  function addDomainToList() {
    const domain = normalizeDomain(domainInput);

    if (!domain) return;

    if (allowedDomains.includes(domain)) {
      setDomainInput("");
      return;
    }

    setAllowedDomains((prev) => [...prev, domain]);

    setDomainInput("");
  }

  /* =======================================================
     REMOVE DOMAIN FROM CREATE LIST
  ======================================================= */

  function removeDomainFromList(domain: string) {
    setAllowedDomains((prev) => prev.filter((item) => item !== domain));
  }

  /* =======================================================
     CLOSE CREATE DIALOG
  ======================================================= */

  function closeCreateDialog() {
    if (creating) return;

    setCreateOpen(false);

    setWidgetName("");

    setDomainInput("");

    setAllowedDomains([]);

    setError(null);
  }

  /* =======================================================
     CREATE WIDGET
  ======================================================= */

  async function handleCreateWidget() {
    const name = widgetName.trim();

    if (!name) {
      setError("Widget name is required.");
      return;
    }

    if (allowedDomains.length === 0) {
      setError("Add at least one allowed domain.");
      return;
    }

    try {
      setCreating(true);
      setError(null);

      const createdWidget = await createWidgetAction(name, allowedDomains);

      setWidget(createdWidget);

      setAllowedDomains(createdWidget.allowedDomains ?? []);

      setCreateOpen(false);

      setWidgetName("");

      setDomainInput("");
    } catch (error) {
      console.error("Create widget error:", error);

      setError(
        error instanceof Error ? error.message : "Failed to create widget.",
      );
    } finally {
      setCreating(false);
    }
  }

  /* =======================================================
     ADD DOMAIN AFTER CREATION
  ======================================================= */

  async function handleAddAllowedDomain() {
    if (!widget) return;

    const domain = normalizeDomain(domainInput);

    if (!domain) return;

    if (allowedDomains.includes(domain)) {
      setDomainInput("");
      setError("Domain already exists.");
      return;
    }

    try {
      setAddingDomain(true);
      setError(null);

      const updatedWidget = await addAllowedDomain(widget.id, domain);

      setWidget(updatedWidget);

      setAllowedDomains(updatedWidget.allowedDomains ?? []);

      setDomainInput("");
    } catch (error) {
      console.error("Add domain error:", error);

      setError(
        error instanceof Error ? error.message : "Failed to add domain.",
      );
    } finally {
      setAddingDomain(false);
    }
  }

  /* =======================================================
     REMOVE DOMAIN
  ======================================================= */

  async function handleRemoveAllowedDomain(domain: string) {
    if (!widget) return;

    if (allowedDomains.length <= 1) {
      setError("A widget must have at least one allowed domain.");

      return;
    }

    try {
      setRemovingDomain(domain);
      setError(null);

      const updatedWidget = await removeAllowedDomain(widget.id, domain);

      setWidget(updatedWidget);

      setAllowedDomains(updatedWidget.allowedDomains ?? []);
    } catch (error) {
      console.error("Remove domain error:", error);

      setError(
        error instanceof Error ? error.message : "Failed to remove domain.",
      );
    } finally {
      setRemovingDomain(null);
    }
  }

  /* =======================================================
     TOGGLE WIDGET
  ======================================================= */

  async function handleToggleWidget() {
    if (!widget || toggling) return;

    try {
      setToggling(true);
      setError(null);

      const updatedWidget = await toggleWidget(widget.id);

      setWidget(updatedWidget);
    } catch (error) {
      console.error("Toggle widget error:", error);

      setError(
        error instanceof Error ? error.message : "Failed to update widget.",
      );
    } finally {
      setToggling(false);
    }
  }

  /* =======================================================
     DOMAIN ENTER KEY
  ======================================================= */

  function handleDomainKeyDown(
    e: React.KeyboardEvent<HTMLInputElement>,
    afterCreation = false,
  ) {
    if (e.key !== "Enter") return;

    e.preventDefault();

    if (afterCreation) {
      handleAddAllowedDomain();
    } else {
      addDomainToList();
    }
  }

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="space-y-6 p-6">
      {/* =================================================
          HEADER
      ================================================= */}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Widgets</h1>

          <p className="text-sm text-muted-foreground">
            Manage your Hireflow application widget.
          </p>
        </div>

        {!loading && !widget && (
          <Button
            onClick={() => {
              setError(null);
              setCreateOpen(true);
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Widget
          </Button>
        )}
      </div>

      {/* =================================================
          ERROR
      ================================================= */}

      {error && (
        <div className="flex items-center justify-between rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          <span>{error}</span>

          <Button size="icon" variant="ghost" onClick={() => setError(null)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* =================================================
          TABS
      ================================================= */}

      <Tabs defaultValue="script">
        <TabsList>
          <TabsTrigger value="script">Embed Script</TabsTrigger>

          <TabsTrigger value="widget">Widget</TabsTrigger>
        </TabsList>

        {/* =================================================
            SCRIPT TAB
        ================================================= */}

        <TabsContent value="script" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Embed your widget</CardTitle>

              <CardDescription>
                Copy this script and add it to your website.
              </CardDescription>
            </CardHeader>

            <CardContent>
              {loading ? (
                <div className="flex min-h-40 items-center justify-center">
                  <Loader2 className="h-5 w-5 animate-spin" />
                </div>
              ) : !widget ? (
                <div className="flex min-h-40 items-center justify-center rounded-lg border border-dashed">
                  <p className="text-sm text-muted-foreground">
                    Create a widget first.
                  </p>
                </div>
              ) : (
                <div className="relative rounded-lg bg-muted p-5">
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute right-4 top-4"
                    onClick={copyScript}
                    disabled={!script}
                  >
                    {copied ? (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="mr-2 h-4 w-4" />
                        Copy
                      </>
                    )}
                  </Button>

                  <pre className="overflow-x-auto pr-24 text-sm">
                    <code>{script || "Widget ID is not available."}</code>
                  </pre>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* =================================================
            WIDGET TAB
        ================================================= */}

        <TabsContent value="widget" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Widget</CardTitle>

              <CardDescription>
                Manage your application widget and allowed domains.
              </CardDescription>
            </CardHeader>

            <CardContent>
              {loading ? (
                <div className="flex min-h-40 items-center justify-center">
                  <Loader2 className="h-5 w-5 animate-spin" />
                </div>
              ) : !widget ? (
                <div className="py-10 text-center">
                  <p className="text-sm text-muted-foreground">
                    No widget created yet.
                  </p>

                  <Button
                    className="mt-4"
                    onClick={() => {
                      setError(null);
                      setCreateOpen(true);
                    }}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Create Widget
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* ======================================
                      WIDGET TABLE
                  ====================================== */}

                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>

                        <TableHead>Widget ID</TableHead>

                        <TableHead>Status</TableHead>

                        <TableHead className="text-right">Active</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">
                          {widget.widgetName ?? "Unnamed Widget"}
                        </TableCell>

                        <TableCell className="font-mono text-xs">
                          {widget.widgetId ?? "N/A"}
                        </TableCell>

                        <TableCell>
                          <Badge
                            variant={widget.isActive ? "default" : "secondary"}
                          >
                            {widget.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </TableCell>

                        <TableCell className="text-right">
                          <Switch
                            checked={widget.isActive}
                            disabled={toggling}
                            onCheckedChange={handleToggleWidget}
                          />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>

                  {/* ======================================
                      ALLOWED DOMAINS
                  ====================================== */}

                  <div className="rounded-lg border p-5">
                    <div className="mb-5">
                      <h3 className="font-medium">Allowed domains</h3>

                      <p className="text-sm text-muted-foreground">
                        Only websites listed here can use this widget.
                      </p>
                    </div>

                    {/* ADD DOMAIN */}

                    <div className="flex gap-2">
                      <Input
                        placeholder="example.com"
                        value={domainInput}
                        onChange={(e) => setDomainInput(e.target.value)}
                        onKeyDown={(e) => handleDomainKeyDown(e, true)}
                        disabled={addingDomain}
                      />

                      <Button
                        type="button"
                        onClick={handleAddAllowedDomain}
                        disabled={!domainInput.trim() || addingDomain}
                      >
                        {addingDomain ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <Plus className="mr-2 h-4 w-4" />
                        )}
                        Add Domain
                      </Button>
                    </div>

                    {/* DOMAIN LIST */}

                    <div className="mt-4 space-y-2">
                      {allowedDomains.length > 0 ? (
                        allowedDomains.map((domain) => (
                          <div
                            key={domain}
                            className="flex items-center justify-between rounded-md border bg-muted/30 px-3 py-2"
                          >
                            <span className="font-mono text-sm">{domain}</span>

                            <Button
                              type="button"
                              size="icon"
                              variant="ghost"
                              disabled={removingDomain === domain}
                              onClick={() => handleRemoveAllowedDomain(domain)}
                            >
                              {removingDomain === domain ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <X className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        ))
                      ) : (
                        <p className="py-4 text-sm text-muted-foreground">
                          No allowed domains configured.
                        </p>
                      )}
                    </div>

                    <p className="mt-3 text-xs text-muted-foreground">
                      Example: example.com or careers.example.com
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* =================================================
          CREATE DIALOG
      ================================================= */}

      <Dialog
        open={createOpen}
        onOpenChange={(open) => {
          if (!creating) {
            setCreateOpen(open);
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Widget</DialogTitle>

            <DialogDescription>
              Configure your widget and choose which websites are allowed to use
              it.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* ==========================================
                WIDGET NAME
            ========================================== */}

            <div className="space-y-2">
              <label className="text-sm font-medium">Widget name</label>

              <Input
                placeholder="e.g. Career Application Form"
                value={widgetName}
                onChange={(e) => setWidgetName(e.target.value)}
                disabled={creating}
              />
            </div>

            {/* ==========================================
                ALLOWED DOMAINS
            ========================================== */}

            <div className="space-y-2">
              <div>
                <label className="text-sm font-medium">Allowed domains</label>

                <p className="text-xs text-muted-foreground">
                  Add the websites where this widget will be embedded.
                </p>
              </div>

              <div className="flex gap-2">
                <Input
                  placeholder="example.com"
                  value={domainInput}
                  onChange={(e) => setDomainInput(e.target.value)}
                  onKeyDown={(e) => handleDomainKeyDown(e, false)}
                  disabled={creating}
                />

                <Button
                  type="button"
                  variant="outline"
                  onClick={addDomainToList}
                  disabled={!domainInput.trim() || creating}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add
                </Button>
              </div>

              {/* DOMAIN LIST */}

              {allowedDomains.length > 0 && (
                <div className="space-y-2 pt-2">
                  {allowedDomains.map((domain) => (
                    <div
                      key={domain}
                      className="flex items-center justify-between rounded-md border bg-muted/30 px-3 py-2"
                    >
                      <span className="font-mono text-sm">{domain}</span>

                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        disabled={creating}
                        onClick={() => removeDomainFromList(domain)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              <p className="text-xs text-muted-foreground">
                Enter domains only, for example: example.com
              </p>
            </div>
          </div>

          {/* ==========================================
              FOOTER
          ========================================== */}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={closeCreateDialog}
              disabled={creating}
            >
              Cancel
            </Button>

            <Button
              disabled={
                !widgetName.trim() || allowedDomains.length === 0 || creating
              }
              onClick={handleCreateWidget}
            >
              {creating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}

              {creating ? "Creating..." : "Create Widget"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
