'use client';
import {
  PlusCircleIcon,
  CheckCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { useState, useRef } from 'react';
import clsx from 'clsx';
import { createEntry } from '@/app/lib/actions';

export default function AddEntry({
  id,
  onComplete,
}: {
  id: string;
  onComplete?: () => void;
}) {
  const [showForm, setShowForm] = useState(true);
  const [complete, setComplete] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);

  function handleComplete() {
    setComplete(!complete);
  }

  async function submit(formData: FormData) {
    try {
      setIsSubmitting(true);
      await createEntry(formData);
      // Reset form
      setShowForm(false);
      setComplete(false);
      formRef.current?.reset();
      // Call onComplete callback if provided
      if (onComplete) {
        onComplete();
      }
    } catch (error) {
      console.error('Error creating entry:', error);
    } finally {
      setIsSubmitting(false);
      setShowForm(true);
    }
  }

  return (
    <form
      action={submit}
      ref={formRef}
      className="relative w-full rounded-lg bg-gray-800 p-4 shadow-inner"
    >
      {/* Hidden input for vehicle ID */}
      <input
        type="text"
        id="vehicle_id"
        name="vehicle_id"
        value={id}
        readOnly
        hidden
      />

      {/* Entry description */}
      <div className="mb-4">
        <label htmlFor="entry" className="mb-1 block text-sm text-gray-400">
          Description
        </label>
        <input
          type="text"
          id="entry"
          name="entry"
          placeholder="Describe maintenance task or repair..."
          className="w-full rounded-lg border border-gray-600 bg-gray-700 p-3 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          required
        />
      </div>

      {/* Status selection */}
      <div className="mb-4">
        <label className="mb-1 block text-sm text-gray-400">Status</label>
        <div className="flex gap-4">
          <label
            className={clsx(
              'flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-2 transition-colors',
              complete
                ? 'border-green-500 bg-green-500/10 text-green-400'
                : 'border-blue-500 bg-blue-500/10 text-blue-400',
            )}
          >
            <input
              type="checkbox"
              id="completed"
              name="complete"
              onChange={handleComplete}
              className="hidden"
              value="1"
            />
            <span className="flex items-center gap-2">
              {complete ? (
                <>
                  <CheckCircleIcon className="h-5 w-5" />
                  <span>Completed</span>
                </>
              ) : (
                <>
                  <ClockCircleIcon className="h-5 w-5" />
                  <span>Pending</span>
                </>
              )}
            </span>
          </label>
        </div>
      </div>

      {/* Completion date - only shown for completed tasks */}
      {complete && (
        <div className="mb-4">
          <label
            htmlFor="date_completed"
            className="mb-1 block text-sm text-gray-400"
          >
            Completion Date
          </label>
          <input
            name="date_completed"
            type="date"
            id="date_completed"
            className="w-full rounded-lg border border-gray-600 bg-gray-700 p-3 text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>
      )}

      {/* Submit button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className={clsx(
            'flex items-center gap-2 rounded-lg bg-blue-500 px-5 py-2 font-medium text-white transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800',
            isSubmitting && 'cursor-not-allowed opacity-70',
          )}
        >
          {isSubmitting ? (
            <>
              <svg
                className="h-5 w-5 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span>Saving...</span>
            </>
          ) : (
            <>
              <PlusCircleIcon className="h-5 w-5" />
              <span>Save Record</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}

// ClockCircleIcon component for the pending status
function ClockCircleIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}
