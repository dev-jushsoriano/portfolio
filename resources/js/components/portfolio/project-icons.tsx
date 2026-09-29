import {
    Bot,
    BriefcaseBusiness,
    Calculator,
    CalendarClock,
    Car,
    ChartColumn,
    Contact,
    Database,
    FileCheck,
    Gauge,
    Globe,
    Headset,
    IdCard,
    Layers,
    type LucideIcon,
    MapPinned,
    MessageSquareText,
    MonitorSmartphone,
    Palette,
    QrCode,
    ShoppingCart,
    Ticket,
    Workflow,
} from 'lucide-react';
import type { ProjectCategory } from '@/types/portfolio';

// Keys must match Project::ICONS in app/Models/Project.php.
const projectIcons: Record<string, LucideIcon> = {
    ticket: Ticket,
    crm: Contact,
    headset: Headset,
    'id-card': IdCard,
    briefcase: BriefcaseBusiness,
    monitor: MonitorSmartphone,
    'qr-code': QrCode,
    calendar: CalendarClock,
    'file-check': FileCheck,
    calculator: Calculator,
    'map-pin': MapPinned,
    gauge: Gauge,
    chart: ChartColumn,
    workflow: Workflow,
    message: MessageSquareText,
    bot: Bot,
    cart: ShoppingCart,
    database: Database,
    car: Car,
    palette: Palette,
};

const categoryFallback: Record<ProjectCategory, LucideIcon> = {
    web: Globe,
    system: Layers,
    design: Palette,
};

export function resolveProjectIcon(icon: string | null, category: ProjectCategory): LucideIcon {
    return (icon && projectIcons[icon]) || categoryFallback[category] || Layers;
}
