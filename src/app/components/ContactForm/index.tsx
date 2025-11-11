'use client';

import React, { useState } from 'react';
import toast from 'react-hot-toast';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);

  // handle field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/insider-signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || 'Signup failed. Please try again.');
      } else {
        toast.success(data.message || '✅ You’re on the list!');
        setFormData({ name: '', email: '' });
      }
    } catch (error) {
      console.error('Signup error:', error);
      toast.error('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-gray-900 text-white rounded-2xl shadow-lg space-y-4"
    >
      <h2 className="text-xl font-semibold text-center">Join DivvyFi Insider</h2>

      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Your Name"
        required
        className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:border-purple-500 outline-none"
      />

      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Your Email"
        required
        className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:border-purple-500 outline-none"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-purple-600 hover:bg-purple-700 transition-colors py-3 rounded-md font-medium"
      >
        {loading ? 'Submitting...' : 'Join Insider'}
      </button>
    </form>
  );
};

export default ContactForm;
