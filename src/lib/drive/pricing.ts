export interface InstructorPackage {
  id: string;
  title: string;
  hours: string;
  price: number;
  originalPrice?: number;
  rateLabel: string;
  saveLabel?: string;
  featured?: boolean;
}

export function buildInstructorPackages(hourlyRate: number): InstructorPackage[] {
  const bundleRate = Math.max(hourlyRate - 5, 65);

  return [
    {
      id: "single",
      title: "Single Lesson",
      hours: "1 hour of driving",
      price: hourlyRate,
      originalPrice: hourlyRate + 10,
      rateLabel: `$${hourlyRate} / hr`,
      saveLabel: `Save $10`,
    },
    {
      id: "starter",
      title: "Starter Pack",
      hours: "6 hours of driving",
      price: bundleRate * 6,
      originalPrice: hourlyRate * 6,
      rateLabel: `$${bundleRate} / hr`,
      saveLabel: `Save $${hourlyRate * 6 - bundleRate * 6}`,
      featured: true,
    },
    {
      id: "progress",
      title: "Progress Pack",
      hours: "10 hours of driving",
      price: bundleRate * 10,
      originalPrice: hourlyRate * 10,
      rateLabel: `$${bundleRate} / hr`,
      saveLabel: `Save $${hourlyRate * 10 - bundleRate * 10}`,
    },
    {
      id: "full-prep",
      title: "Full Prep Pack",
      hours: "15 hours of driving",
      price: bundleRate * 15,
      originalPrice: hourlyRate * 15,
      rateLabel: `$${bundleRate} / hr`,
      saveLabel: `Save $${hourlyRate * 15 - bundleRate * 15}`,
    },
  ];
}

export function formatDrivePrice(amount: number): string {
  return `$${amount.toLocaleString("en-US")}`;
}

export function getStartingPrice(packages: InstructorPackage[]): number {
  return packages[0]?.price ?? 0;
}
