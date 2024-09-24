import { Color } from "./components/common/BasicChip";
import { ApplicationStatus } from "./types";

export const StatusMap: Record<ApplicationStatus, Color> = {
	Applied: 'blue',
	Interview: 'yellow',
	Offer: 'green',
	Rejected: 'red',
}