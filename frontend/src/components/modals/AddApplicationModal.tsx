'use client'

import { Dispatch, SetStateAction } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'


interface ModalProps {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
}

export default function Modal({ open, setOpen }: ModalProps) {
    return (
        <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">

            <DialogTitle className="flex items-center justify-center p-5 text-lg font-medium text-gray-900 bg-white border-b border-gray-200">
                <ExclamationTriangleIcon className="w-6 h-6 mr-2 text-yellow-500" />
                Add Application
            </DialogTitle>


            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
            />


            <div className="fixed inset-0 z-40 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                        transition
                        className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-2xl data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                    >
                        <div className="px-5 py-3">
                            {/* <AddApplicationForm /> */}
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}
