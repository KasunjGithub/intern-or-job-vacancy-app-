import { X, Mail, Phone, MessageCircle } from "lucide-react";

export default function ContactAdminModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: "admin@jobapp.com",
      action: () => window.open("mailto:admin@jobapp.com?subject=Add Company Vacancies"),
      color: "text-blue-400 bg-blue-500/20 ring-blue-400/20"
    },
    {
      icon: Phone,
      label: "Phone",
      value: "0714973535",
      action: () => window.open("tel:+15551234567"),
      color: "text-green-400 bg-green-500/20 ring-green-400/20"
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: "0776542344",
      action: () => window.open("https://wa.me/15551234567?text=Hi, I want to add company vacancies"),
      color: "text-emerald-400 bg-emerald-500/20 ring-emerald-400/20"
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-3xl bg-slate-900 p-6 ring-1 ring-white/10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-cyan-300">Contact Admin</h2>
          <button
            onClick={onClose}
            className="rounded-xl p-2 text-white/70 hover:bg-white/10"
          >
            <X size={20} />
          </button>
        </div>

        <p className="text-white/70 mb-6">
          Contact our admin team to add your company vacancies to the platform.
        </p>

        <div className="space-y-3">
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <button
                key={index}
                onClick={method.action}
                className="w-full flex items-center gap-4 rounded-xl bg-white/5 p-4 ring-1 ring-white/10 hover:bg-white/10 transition"
              >
                <div className={`rounded-xl p-3 ring-1 ${method.color}`}>
                  <Icon size={20} />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-white">{method.label}</div>
                  <div className="text-sm text-white/70">{method.value}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}