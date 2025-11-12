'use client'
import React, { useState, useEffect } from 'react'

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phnumber: '',
    message: '',
  })
  const [loader, setLoader] = useState(false)
  const [showThanks, setShowThanks] = useState(false)
  const [isFormValid, setIsFormValid] = useState(false)

  useEffect(() => {
    const isValid = Object.values(formData).every((value) => value.trim() !== '')
    setIsFormValid(isValid)
  }, [formData])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const resetForm = () => {
    setFormData({
      firstname: '',
      lastname: '',
      email: '',
      phnumber: '',
      message: '',
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!isFormValid) return
    setLoader(true)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await res.json()

      if (data.success) {
        setShowThanks(true)
        resetForm()
        setTimeout(() => setShowThanks(false), 5000)
      } else {
        console.error('Submission error:', data.error)
      }
    } catch (err) {
      console.error('Network error:', err)
    } finally {
      setLoader(false)
    }
  }

  return (
    <section id="contact" className="scroll-mt-14">
      <div className="container">
        <div className="relative">
          <h2 className="mb-9 capitalize">Get in Touch</h2>
          <div className="relative border border-lightblue/35 px-6 py-2 rounded-2xl">
            <form
              onSubmit={handleSubmit}
              className="flex flex-wrap w-full m-auto justify-between"
            >
              <div className="sm:flex gap-6 w-full">
                <div className="mx-0 my-2.5 flex-1">
                  <label htmlFor="fname" className="pb-3 inline-block text-base text-lightpurple">
                    First Name
                  </label>
                  <input
                    id="fname"
                    type="text"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                    placeholder="John"
                    className="w-full text-base px-4 rounded-2xl py-2.5 border-lightblue/35 border transition-all duration-500 focus:border-primary focus:outline-0 placeholder:text-lightsky/40 text-white"
                  />
                </div>
                <div className="mx-0 my-2.5 flex-1">
                  <label htmlFor="lname" className="pb-3 inline-block text-base text-lightpurple">
                    Last Name
                  </label>
                  <input
                    id="lname"
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
                <div className="mx-0 my-2.5 flex-1">
                  <label htmlFor="email" className="pb-3 inline-block text-base text-lightpurple">
                    Email Address
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
                <div className="mx-0 my-2.5 flex-1">
                  <label htmlFor="phnumber" className="pb-3 inline-block text-base text-lightpurple">
                    Phone Number
                  </label>
                  <input
                    id="phnumber"
                    type="tel"
                    name="phnumber"
                    value={formData.phnumber}
                    onChange={handleChange}
                    placeholder="+1234567890"
                    className="w-full text-base px-4 rounded-2xl py-2.5 border-lightblue/35 border transition-all duration-500 focus:border-primary focus:outline-0 placeholder:text-lightsky/40 text-white"
                  />
                </div>
              </div>
              <div className="w-full mx-0 my-2.5 flex-1">
                <label htmlFor="message" className="text-base inline-block text-lightpurple">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full mt-2 rounded-2xl px-5 py-3 border-lightblue/35 border transition-all duration-500 focus:border-primary focus:outline-0 placeholder:text-lightsky/40 text-white"
                  placeholder="Anything else you wanna communicate"
                ></textarea>
              </div>
              <div className="mx-0 my-2.5 w-full">
                <button
                  type="submit"
                  disabled={!isFormValid || loader}
                  className={`border leading-none px-6 text-lg font-medium py-4 rounded-full 
                    ${
                      !isFormValid || loader
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-primary border-primary text-white hover:bg-transparent hover:text-primary cursor-pointer'
                    }`}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
          {showThanks && (
            <div className="text-white bg-primary rounded-full px-4 text-lg mb-4.5 mt-1 absolute flex items-center gap-2">
              Thank you for contacting us! We will get back to you soon.
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default ContactForm
