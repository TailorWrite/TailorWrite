import React from 'react'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Chip } from "@material-tailwind/react"

import { ApplicationStatus, ChipColor } from '../../types'

const STATUS_MAP: { [key in ApplicationStatus]: ChipColor } = {
	Applied: 'blue',
	Interview: 'yellow',
	Offer: 'green',
	Rejected: 'red',
}

/**
 * StatusSelector component
 * @param onStatusSelect - Function to handle status selection
 */
interface StatusSelectorProps {
	onStatusSelect: (status: ApplicationStatus) => void
	statusSelected: ApplicationStatus
	setStatusSelected: (status: ApplicationStatus) => void
}


export default function StatusSelector({ onStatusSelect, statusSelected, setStatusSelected }: StatusSelectorProps) {

	const handleStatusSelect = (status: ApplicationStatus) => {
		setStatusSelected(status)
		onStatusSelect(status)
	}

	return (
		<div className="mt-auto">
			<Listbox value={statusSelected} onChange={handleStatusSelect}>
				<div className="relative">

					{/* Currently selected status */}
					<ListboxButton className="relative w-28 cursor-default rounded-lg bg-white text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
						<Chip
							variant="ghost"
							size="sm"
							value={statusSelected}
							color={STATUS_MAP[statusSelected]}
						/>
						<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
							<ChevronUpDownIcon
								className="h-5 w-5 text-gray-400"
								aria-hidden="true"
							/>
						</span>
					</ListboxButton>

					{/* Dropdown options of all status */}
					<Transition
						as={React.Fragment}
						leave="transition ease-in duration-100"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<ListboxOptions className="absolute mt-1 max-h-60 w-34 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">

							{
								// Map over STATUS_MAP to render options in the dropdown
								Object.entries(STATUS_MAP).map(([key, value]) => (
									<ListboxOption
										key={key}
										className={({ active }) =>
											`relative cursor-default select-none py-2 pl-4 pr-10 ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
											}`
										}
										value={key}
									>
										{({ selected }) => (
											<>
												{selected ? (
													<span className="absolute inset-y-0 right-0 flex items-center pr-3 text-amber-600">
														<CheckIcon className="h-5 w-5" aria-hidden="true" />
													</span>
												) : null}

												<Chip
													variant="ghost"
													size="sm"
													value={key}
													color={value}
												/>
											</>
										)}
									</ListboxOption>
								))
							}
						</ListboxOptions>
					</Transition>
				</div>
			</Listbox>
		</div>
	)
}