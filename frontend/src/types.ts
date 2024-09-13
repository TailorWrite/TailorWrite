
export const suppressMissingAttributes = {
    placeholder: undefined,
    onPointerEnterCapture: undefined,
    onPointerLeaveCapture: undefined,
};

// Importing Types
import { color } from "@material-tailwind/react/types/components/chip";

// Exporting Types
export type ChipColor = color; 
export type ApplicationStatus = "Applied" | "Interview" | "Offer" | "Rejected";

// Exporting Interfaces
export interface StatusMap {
    Applied: ChipColor,
    Interview: ChipColor,
    Offer: ChipColor,
    Rejected: ChipColor,
}

export interface ApplicationDocuments {
    name: string,
    size: string,
    link: string,
}

export interface ApplicationData {
    id: string,
    img: string | null,
    company_name: string,
    job_title: string,
    description?: string,
    status: string, // ApplicationStatus,
    application_date: string,
    application_url: string,
    notes?: string,
    documents?: ApplicationDocuments[],
}

export interface ApplicationAction {
    name: string,
    color: string,
    icon: React.FC | React.ComponentType<React.SVGProps<SVGSVGElement>>,
    action: () => void,
}


export interface AxiosError {
    response: {
        data: {
            error: string,
        },
    },
}

export interface ActionDataProps { error: string, success: string }