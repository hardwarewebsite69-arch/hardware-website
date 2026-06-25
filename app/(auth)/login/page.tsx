'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Header } from '@/components/Header'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrorMsg(null)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      // Replicates the design style error messaging
      setErrorMsg("The password entered is incorrect. Please try again.")
      setLoading(false)
    } else {
      router.refresh()
      router.push('/admin/dashboard')
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-between bg-[#f8f9fa] px-4 py-8 antialiased font-sans">
          <Header/>

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
          <form onSubmit={handleLogin} className="space-y-5">
            
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

            {/* Password Field View */}
            <div className="space-y-2">
              <label className="text-xs font-bold tracking-wider text-neutral-800 uppercase">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`w-full rounded-md border p-3.5 pr-11 text-sm text-neutral-900 placeholder-neutral-300 focus:outline-none transition-colors ${
                    errorMsg 
                      ? 'border-red-600 focus:border-red-600' 
                      : 'border-neutral-300 focus:border-neutral-500'
                  }`}
                />
                {/* Interactive Visibility Toggle matching the eye element layout */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-600 hover:text-neutral-800 focus:outline-none"
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 17.654 17.654m-11.426-11.426L18.336 18.336M12 7.5a4.5 4.5 0 0 0-4.5 4.5m4.5-4.5a4.5 4.5 0 0 1 4.5 4.5M12 16.5a4.5 4.5 0 0 1-4.5-4.5" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                  )}
                </button>
              </div>
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

            {/* Orange Action Button Configuration */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded bg-[#eb5a0c] p-3.5 text-sm font-bold tracking-wider text-white uppercase transition hover:bg-[#d44f0a] focus:outline-none disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Sign In'}
            </button>

            {/* Forgot Password Anchor Route Integration */}
            <div className="text-center pt-2">
              <Link 
                href="/forgot-password" 
                className="text-xs font-medium text-neutral-600 underline hover:text-neutral-900 transition-colors"
              >
                Forgot password?
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