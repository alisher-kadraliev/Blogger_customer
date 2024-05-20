import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { X } from 'lucide-react'
const navigation = [
    { name: 'Hakkımda', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Portfolio', href: '#' },
]

export default function Footer() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <>
        footer
        </>
    );
}
