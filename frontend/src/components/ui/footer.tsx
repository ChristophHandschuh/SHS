import { Separator } from "@/components/ui/separator"
import {  Mail, Code, School, BookOpenText } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-white text-black">
      <div className="container mx-auto px-4 py-12">
        <Separator className="my-8 bg-gray-800" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Logo and company info */}
          <div className="space-y-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <BookOpenText />
              </svg>
              <span className="font-bold text-xl">SHS - Schüler helfen Schüler</span>
            <p className="text-sm text-gray-400">
              Offiziele Nachhilfe Platform der HTL Hollabrunn. Entiwickelt von Schülern der Elektronik Abteilung
            </p>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Information</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Mail size={16} />
                <span>leonbinder.sw@gmail.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <School size={16} />
                <a href="https://www.htl-hl.ac.at/web/" className="text-blue-800">HTL Hollabrunn</a>
              </li>
              <li className="flex items-center space-x-2">
                <Code size={16} />
                <span>Christoph Handschuh, Leon Binder</span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-gray-800" />
      </div>
    </footer>
  )
}