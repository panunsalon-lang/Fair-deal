export default function WhatsAppButton() {
  const phoneNumber = "9906515680";
  const message = encodeURIComponent("Hello, I'm interested in your jewelry collection.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 active:scale-95"
      title="Chat with us on WhatsApp"
      aria-label="WhatsApp"
    >
      <span className="text-2xl">💬</span>
    </a>
  );
}
