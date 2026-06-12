'use client'

export default function MobileBar() {
  return (
    <div className="fixed bottom-0 inset-x-0 z-50 sm:hidden bg-white border-t border-gray-200 safe-area-inset-bottom">
      <div className="grid grid-cols-3 divide-x divide-gray-200">
        <a
          href="tel:+13868527207"
          className="flex flex-col items-center py-3 text-gray-600 hover:text-teal transition-colors active:bg-gray-50"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.12 6.12l.9-.9a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 17.22z"/>
          </svg>
          <span className="text-[10px] mt-1 font-medium">Call</span>
        </a>
        <a
          href="sms:+13868527207"
          className="flex flex-col items-center py-3 text-gray-600 hover:text-teal transition-colors active:bg-gray-50"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          <span className="text-[10px] mt-1 font-medium">Text</span>
        </a>
        <a
          href="#contact"
          className="flex flex-col items-center py-3 bg-brand text-white active:bg-brand-dark transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
          <span className="text-[10px] mt-1 font-medium">Home Value</span>
        </a>
      </div>
    </div>
  )
}
