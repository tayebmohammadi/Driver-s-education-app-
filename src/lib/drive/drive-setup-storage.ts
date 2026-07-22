const STORAGE_KEY = "drive-school-setup";

export interface DriveSetup {
  address: string;
  instructorId: string;
}

export function loadDriveSetup(): DriveSetup | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as Partial<DriveSetup>;
    if (
      typeof parsed.address === "string" &&
      parsed.address.trim().length > 0 &&
      typeof parsed.instructorId === "string" &&
      parsed.instructorId.trim().length > 0
    ) {
      return {
        address: parsed.address.trim(),
        instructorId: parsed.instructorId.trim(),
      };
    }
  } catch {
    return null;
  }

  return null;
}

export function saveDriveSetup(setup: DriveSetup): void {
  if (typeof window === "undefined") return;

  const normalized = {
    address: setup.address.trim(),
    instructorId: setup.instructorId.trim(),
  };

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));

  void fetch("/api/drive/setup", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(normalized),
  }).catch(() => {
    // Local fallback remains if the network request fails.
  });
}

export function clearDriveSetup(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}

const SETUP_FETCH_TIMEOUT_MS = 8000;

async function fetchDriveSetupFromApi(): Promise<DriveSetup | null> {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(
    () => controller.abort(),
    SETUP_FETCH_TIMEOUT_MS
  );

  try {
    const response = await fetch("/api/drive/setup", {
      signal: controller.signal,
    });
    if (!response.ok) return null;

    const data = (await response.json()) as {
      setup?: DriveSetup | null;
    };

    if (data.setup?.address && data.setup.instructorId) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data.setup));
      return data.setup;
    }
  } catch {
    return null;
  } finally {
    window.clearTimeout(timeoutId);
  }

  return null;
}

export async function loadDriveSetupFromAccount(): Promise<DriveSetup | null> {
  const local = loadDriveSetup();
  const remote = await fetchDriveSetupFromApi();
  return remote ?? local;
}
