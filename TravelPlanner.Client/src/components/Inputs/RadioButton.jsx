import React from 'react'

export default function ({text,groupType,name,onValueChange}) {
  return (
    <div>
        <input type="radio" id="groupType" name={name} value="hosting-small" class="hidden peer" required onChange={onValueChange()}/>
        <label for="groupType" class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">                           
            <div class="block">
                <div class="w-full text-lg font-semibold">{children}</div>
            </div>
        </label>
    </div>
  )
}
