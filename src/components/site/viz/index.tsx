import { VizVirtualization } from "./viz-virtualization";
import { VizInternet } from "./viz-internet";
import { VizColocation } from "./viz-colocation";
import { VizHardware } from "./viz-hardware";
import { VizCybersecurity } from "./viz-cybersecurity";
import { VizPhysicalSecurity } from "./viz-physical-security";

export const VIZ_MAP: Record<string, React.ComponentType> = {
  virtualization: VizVirtualization,
  internet: VizInternet,
  colocation: VizColocation,
  hardware: VizHardware,
  cybersecurity: VizCybersecurity,
  "physical-security": VizPhysicalSecurity,
};

// Alias for clarity in detail page usage
export const VIZ_BY_SLUG = VIZ_MAP;
