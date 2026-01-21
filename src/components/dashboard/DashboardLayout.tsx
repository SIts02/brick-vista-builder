import React, { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/contexts/AuthContext";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { AvatarDropdown } from "@/components/ui/avatar-dropdown";
import { motion } from "framer-motion";
import { 
  Home,
  PiggyBank,
  BarChart3,
  ArrowLeftRight,
  Target,
  MessageSquarePlus,
  Settings,
  FileText,
  Zap,
  Wallet,
  LogOut
} from "lucide-react";
import { useTranslation } from "react-i18next";
import ascendLogo from "@/assets/ascend-logo.png";
import {
  SidebarAceternity,
  SidebarBody,
  SidebarLink,
  useSidebarAceternity,
  SidebarProviderAceternity,
} from "@/components/ui/sidebar-aceternity";
import { Link } from "react-router-dom";

interface DashboardLayoutProps {
  children: ReactNode;
  activePage?: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  activePage = "",
}) => {
  const { t } = useTranslation();
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  // Navigation links for Aceternity sidebar
  const links = [
    {
      label: t("sidebar.dashboard"),
      href: "/dashboard",
      icon: <Home className="text-sidebar-foreground h-5 w-5 flex-shrink-0" />,
    },
    {
      label: t("sidebar.transactions"),
      href: "/dashboard/transacoes",
      icon: <ArrowLeftRight className="text-sidebar-foreground h-5 w-5 flex-shrink-0" />,
    },
    {
      label: t("sidebar.budget"),
      href: "/dashboard/orcamento",
      icon: <Wallet className="text-sidebar-foreground h-5 w-5 flex-shrink-0" />,
    },
    {
      label: t("sidebar.investments"),
      href: "/dashboard/investimentos",
      icon: <PiggyBank className="text-sidebar-foreground h-5 w-5 flex-shrink-0" />,
    },
    {
      label: t("sidebar.goals"),
      href: "/dashboard/metas",
      icon: <Target className="text-sidebar-foreground h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Automação",
      href: "/dashboard/automacao",
      icon: <Zap className="text-sidebar-foreground h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Relatórios",
      href: "/dashboard/relatorios",
      icon: <FileText className="text-sidebar-foreground h-5 w-5 flex-shrink-0" />,
    },
    {
      label: t("sidebar.assistant"),
      href: "/dashboard/assistente",
      icon: <MessageSquarePlus className="text-sidebar-foreground h-5 w-5 flex-shrink-0" />,
    },
    {
      label: t("sidebar.settings"),
      href: "/dashboard/configuracoes",
      icon: <Settings className="text-sidebar-foreground h-5 w-5 flex-shrink-0" />,
    },
  ];

  return (
    <div className="flex flex-col md:flex-row bg-background w-full flex-1 mx-auto overflow-hidden h-screen">
      <SidebarAceternity open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            {/* Logout button */}
            <button
              onClick={handleLogout}
              className="flex items-center justify-start gap-2 group/sidebar py-2 text-sidebar-foreground hover:text-red-400 transition-colors"
            >
              <LogOut className="h-5 w-5 flex-shrink-0" />
              <motion.span
                animate={{
                  display: open ? "inline-block" : "none",
                  opacity: open ? 1 : 0,
                }}
                className="text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0"
              >
                Sair
              </motion.span>
            </button>
            
            {/* Theme toggle and avatar */}
            <div className="flex items-center gap-2">
              <AvatarDropdown />
              {open && <ThemeToggle />}
            </div>
          </div>
        </SidebarBody>
      </SidebarAceternity>

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        <motion.header 
          className="bg-card shadow-sm z-10 flex justify-between items-center p-4 transition-colors duration-300 border-b border-border"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.3 }}
        >
          <motion.h1 
            className="text-xl md:text-2xl font-semibold text-foreground transition-colors duration-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {activePage}
          </motion.h1>
        </motion.header>
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 bg-background transition-colors duration-300">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.3 }}
            className="h-full"
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

// Logo component for expanded state
const Logo = () => {
  return (
    <Link
      to="/dashboard"
      className="font-normal flex space-x-2 items-center text-sm text-sidebar-foreground py-1 relative z-20"
    >
      <img
        src={ascendLogo}
        alt="Ascend Logo"
        className="h-8 max-w-[140px] object-contain"
      />
    </Link>
  );
};

// Logo icon for collapsed state
const LogoIcon = () => {
  return (
    <Link
      to="/dashboard"
      className="font-normal flex space-x-2 items-center text-sm text-sidebar-foreground py-1 relative z-20"
    >
      <img
        src={ascendLogo}
        alt="Ascend Logo"
        className="h-7 w-7 object-contain"
      />
    </Link>
  );
};

export default DashboardLayout;
