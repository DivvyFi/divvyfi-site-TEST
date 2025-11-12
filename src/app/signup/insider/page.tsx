'use client'

import React, { useState, useEffect } from 'react'

const InsiderSignupForm = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    assetClass: 'real estate',
    netWorth: '',
  })

  const [loader, setLoader] = useState(false)
  const [showThanks, setShowThanks] = useState(false)
  const [isFormValid, setIsFormValid] = useState(false)

  useEffect(() => {
    const isValid =
      formData.firstname.trim() !== '' &&
      formData.lastname.trim() !== '' &&
      formData.email.trim() !== '' &&
      formData.assetClass.trim() !== ''
    setIsFormValid(isValid)
  }, [formData])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const reset = () => {
    setFormData({
      firstname: '',
      lastname: '',
      email: '',
      assetClass: 'real estate',
      netWorth: '',
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isFormValid) return

    setLoader(true)

    try {
      const res = await fetch('/api/insider-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (data.success) {
        setShowThanks(true)
        reset()
        setTimeout(() => setShowThanks(false), 5000)
      } else {
        console.error('Submission failed:', data.error)
      }
    } catch (err) {
      console.error('Fetch error:', err)
    } finally {
      setLoader(false)
    }
  }

  return (
    <section id="insider" className="pt-36 scroll-mt-36">
      <div className="container">
        <div className="relative">
          <h2 className="mb-12 capitalize">Join Our Insider List</h2>
          <div className="relative border border-lightblue/35 px-6 py-6 rounded-2xl">
            <form
              onSubmit={handleSubmit}
              className="flex flex-wrap w-full m-auto justify-between"
            >
              <div className="sm:flex gap-6 w-full">
                <div className="flex-1 my-2.5">
                  <label htmlFor="firstname" className="pb-3 inline-block text-base text-lightpurple">
                    First Name
                  </label>
                  <input
                    id="firstname"
                    type="text"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                    placeholder="John"
                    className="w-full text-base px-4 rounded-2xl py-2.5 border-lightblue/35 border transition-all duration-500 focus:border-primary focus:outline-0 placeholder:text-lightsky/40 text-white"
                  />
                </div>
                <div className="flex-1 my-2.5">
                  <label htmlFor="lastname" className="pb-3 inline-block text-base text-lightpurple">
                    Last Name
                  </label>
                  <input
                    id="lastname"
                    type="text"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                    placeholder="Doe"
                    className="w-full text-base px-4 rounded-2xl py-2.5 border-lightblue/35 border transition-all duration-500 focus:border-primary focus:outline-0 placeholder:text-lightsky/40 text-white"
                  />
                </div>
              </div>

              <div className="sm:flex gap-6 w-full">
                <div className="flex-1 my-2.5">
                  <label htmlFor="email" className="pb-3 inline-block text-base text-lightpurple">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john.doe@example.com"
                    className="w-full text-base px-4 rounded-2xl py-2.5 border-lightblue/35 border transition-all duration-500 focus:border-primary focus:outline-0 placeholder:text-lightsky/40 text-white"
                  />
                </div>
                <div className="flex-1 my-2.5">
                  <label htmlFor="assetClass" className="pb-3 inline-block text-base text-lightpurple">
                    Interested Asset Class
                  </label>
                  <select
                    id="assetClass"
                    name="assetClass"
                    value={formData.assetClass}
                    onChange={handleChange}
                    className="w-full text-base px-4 rounded-2xl py-2.5 border-lightblue/35 border bg-dark transition-all duration-500 focus:border-primary focus:outline-0 text-white"
                  >
                    <option value="real estate">Real Estate</option>
                    <option value="business">Business</option>
                    <option value="commodities">Commodities</option>
                  </select>
                </div>
              </div>

              <div className="w-full my-2.5">
                <label htmlFor="netWorth" className="pb-3 inline-block text-base text-lightpurple">
                  Your Net Worth (Optional)
                </label>
                <input
                  id="netWorth"
                  type="text"
                  name="netWorth"
                  value={formData.netWorth}
                  onChange={handleChange}
                  placeholder="$100,000"
                  className="w-full text-base px-4 rounded-2xl py-2.5 border-lightblue/35 border transition-all duration-500 focus:border-primary focus:outline-0 placeholder:text-lightsky/40 text-white"
                />
              </div>

              <div className="w-full my-2.5">
                <button
                  type="submit"
                  disabled={!isFormValid || loader}
                  className={`border leading-none px-6 text-lg font-medium py-4 rounded-full ${
                    !isFormValid || loader
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-primary border-primary text-white hover:bg-transparent hover:text-primary cursor-pointer'
                  }`}
                >
                  Join Now
                </button>
              </div>
            </form>
          </div>

          {showThanks && (
            <div className="text-white bg-primary rounded-full px-4 text-lg mb-4.5 mt-1 absolute flex items-center gap-2">
              Thank you! You've been added to the insider list.
              <div className="w-3 h-3 rounded-full animate-spin border-2 border-lightblue border-t-transparent"></div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default InsiderSignupForm
