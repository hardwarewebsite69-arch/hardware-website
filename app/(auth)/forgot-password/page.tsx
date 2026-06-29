'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const supabase = createClient()

  const handleResetRequest = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrorMsg(null)
    setMessage(null)

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/update-password`,
    })

    if (error) {
      setErrorMsg(error.message)
    } else {
      setMessage('Password reset link sent! Please check your email inbox.')
    }
    setLoading(false)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-between bg-[#f8f9fa] px-4 py-8 antialiased font-sans">
      {/* Spacer for vertical layout alignment */}
      <div className="hidden md:block" />

      {/* Main Authentication Card Component */}
      <div className="w-full max-w-[460px] space-y-8 mt-12 md:mt-0">
        <div className="space-y-1.5 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
            Amroz Hardware Traders
          </h1>
          <p className="text-xs font-semibold tracking-widest text-neutral-500 uppercase">
            Industrial Systems Access
          </p>
        </div>

        <div className="rounded-xl border border-neutral-200/80 bg-white p-10 shadow-sm">
          <form onSubmit={handleResetRequest} className="space-y-5">
            <div className="text-sm text-neutral-600 pb-2">
              Enter your email address below, and we will send you a secure link to reset your account credentials.
            </div>

            {/* Error Notification Block matching layout screen text placement */}
            {errorMsg && (
              <div className="flex items-center space-x-1.5 text-xs font-semibold text-red-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                </svg>
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Success Notification Block matching layout screen text placement */}
            {message && (
              <div className="flex items-center space-x-1.5 text-xs font-semibold text-emerald-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{message}</span>
              </div>
            )}

            {/* Email Field View */}
            <div className="space-y-2">
              <label className="text-xs font-bold tracking-wider text-neutral-800 uppercase">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@industrialgear.com"
                className="w-full rounded-md border border-neutral-300 bg-white p-3.5 text-sm text-neutral-900 placeholder-neutral-400 focus:border-neutral-500 focus:outline-none transition-colors"
              />
            </div>

            {/* Orange Action Button Configuration */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded bg-[#eb5a0c] p-3.5 text-sm font-bold tracking-wider text-white uppercase transition hover:bg-[#d44f0a] focus:outline-none disabled:opacity-50"
            >
              {loading ? 'Sending Link...' : 'Send Reset Link'}
            </button>

            {/* Anchor back to Sign In page */}
            <div className="text-center pt-2">
              <Link 
                href="/login" 
                className="text-xs font-medium text-neutral-600 underline hover:text-neutral-900 transition-colors"
              >
                Back to Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* Styled Application Footer Configuration */}
      <footer className="mt-12 text-center space-y-1.5 text-xs text-neutral-400">
        <p>© 2026 Industrial Systems Corp.</p>
        <div className="flex justify-center space-x-4">
          <a href="#" className="hover:underline">Terms</a>
          <a href="#" className="hover:underline">Privacy</a>
          <a href="#" className="hover:underline">Support</a>
        </div>
      </footer>
    </div>
  )
}