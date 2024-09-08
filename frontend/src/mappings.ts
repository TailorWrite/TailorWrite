import { ApplicationStatus, ChipColor } from "./types";

export const StatusMap: { [key in ApplicationStatus]: ChipColor } = {
	Applied: 'blue',
	Interview: 'yellow',
	Offer: 'green',
	Rejected: 'red',
}