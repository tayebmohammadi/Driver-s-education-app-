"use client";

export function DriveLayout({
  children,
  title,
  shell = "detail",
}: {
  children: React.ReactNode;
  title?: string;
  shell?: "home" | "detail";
}) {
  return (
    <div className="drive-shell">
      {shell === "home" ? (
        <header className="drive-home-header">
          <h1>Driving School</h1>
        </header>
      ) : null}

      <main className={`drive-main${shell === "home" ? " drive-main--home" : ""}`}>
        {title && shell !== "home" ? (
          <h1 className="drive-page-title">{title}</h1>
        ) : null}
        {children}
      </main>
    </div>
  );
}
