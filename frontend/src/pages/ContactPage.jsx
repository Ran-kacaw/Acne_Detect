import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactSchema } from '../utils/validators'
import Navbar from '../components/landing/Navbar'
import Footer from '../components/landing/Footer'
import PageTransition from '../components/shared/PageTransition'
import { sendContactMessage } from '../utils/apiService'
import { Send, Mail, MapPin, Phone, Loader2, CheckCircle } from 'lucide-react'
import toast from 'react-hot-toast'

const Panel = ({ children, className = '' }) => {
  return (
    <div
      className={`
        relative overflow-hidden
        rounded-[16px]
        shadow-sm
        border-[1.5px] border-[#c4a800]
        ${className}
      `}
      style={{ background: 'linear-gradient(145deg, #fefcf7 0%, #fdf9ee 55%, #fbf4e0 100%)' }}
    >
      {/* Orb: bottom right */}
      <div
        className="pointer-events-none absolute -bottom-16 -right-16 h-72 w-72 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(240,215,90,0.18) 0%, rgba(240,215,90,0.06) 55%, transparent 72%)' }}
      />
      {/* Orb: top right */}
      <div
        className="pointer-events-none absolute -top-12 right-14 h-44 w-44 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(60,139,137,0.07) 0%, transparent 65%)' }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}

const ContactInfo = ({ icon, label, value }) => {
  return (
    <div className="flex items-start gap-4">
      <div className="w-10 h-10 bg-[#e9f6f5] text-[#3a918d] rounded-[12px] flex items-center justify-center shrink-0">
        {icon}
      </div>

      <div>
        <h3 className="text-[12px] font-bold text-[#9aa5b5] tracking-wide mb-1">
          {label}
        </h3>

        <p className="text-[13px] leading-4 text-[#1d2d44]">{value}</p>
      </div>
    </div>
  )
}

const InputField = ({ label, placeholder, error, disabled, register }) => {
  return (
    <div className="mb-4">
      <label className="block text-[12px] font-bold text-[#1d2d44] mb-2">
        {label}
      </label>

      <input
        {...register}
        disabled={disabled}
        className={`
          w-full px-4 py-3
          border rounded-[10px]
          text-[13px]
          outline-none
          bg-white
          transition
          focus:border-[#3a918d]
          ${error ? 'border-red-400' : 'border-[#cbdede]'}
        `}
        placeholder={placeholder}
      />

      {error && (
        <p className="text-red-500 text-[10px] mt-1">{error.message}</p>
      )}
    </div>
  )
}

const ContactPage = () => {
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({ resolver: zodResolver(contactSchema) })

  const onSubmit = async (data) => {
    await sendContactMessage(data)
    toast.success('Pesan berhasil dikirim!')
    setSubmitSuccess(true)
    reset()
  }

  return (
    <div className="min-h-screen mesh-bg flex flex-col">
      <Navbar />

      <main className="flex-1">
        <PageTransition>
          <section className="px-4 pt-8 pb-16">
            <div className="text-center mb-6">
              <h1 className="text-[25px] font-bold text-white mb-2">
                Hubungi Kami
              </h1>
            </div>

            {submitSuccess ? (
              <div className="flex justify-center">
                <Panel className="w-full max-w-[675px] px-8 py-10 text-center">
                  <CheckCircle size={48} className="text-[#3a918d] mx-auto mb-3" />

                  <h3 className="text-lg font-semibold text-[#102c2b] mb-2">
                    Pesan Terkirim!
                  </h3>

                  <p className="text-[#617273] text-sm">
                    Kami akan segera menghubungi Anda.
                  </p>
                </Panel>
              </div>
            ) : (
              <div className="flex justify-center">
                <div className="w-full max-w-[676px] grid grid-cols-1 md:grid-cols-[272px_1fr] gap-5">
                  <Panel className="min-h-[374px] px-7 py-7">
                    <div className="space-y-6">
                      <ContactInfo
                        icon={<Mail size={18} />}
                        label="EMAIL"
                        value="acnedetect@gmail.com"
                      />

                      <ContactInfo
                        icon={<Phone size={18} />}
                        label="TELEPON"
                        value="+62 812-3456-7890"
                      />

                      <ContactInfo
                        icon={<MapPin size={18} />}
                        label="ALAMAT"
                        value={
                          <>
                            Jl. Merdeka No.101,
                            <br />
                            Jerawat Sirna
                          </>
                        }
                      />
                    </div>
                  </Panel>

                  <Panel className="min-h-[374px] px-7 py-7">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <InputField
                        label="Nama"
                        placeholder="Nama Anda"
                        error={errors.name}
                        disabled={isSubmitting}
                        register={register('name')}
                      />

                      <InputField
                        label="Email"
                        placeholder="email@example.com"
                        error={errors.email}
                        disabled={isSubmitting}
                        register={register('email')}
                      />

                      <div className="mb-5">
                        <label className="block text-[12px] font-bold text-[#1d2d44] mb-2">
                          Pesan
                        </label>

                        <textarea
                          {...register('message')}
                          disabled={isSubmitting}
                          rows={4}
                          className={`
                            w-full px-4 py-3
                            border rounded-[10px]
                            text-[13px]
                            outline-none resize-none
                            bg-white
                            transition
                            focus:border-[#3a918d]
                            ${
                              errors.message
                                ? 'border-red-400'
                                : 'border-[#cbdede]'
                            }
                          `}
                          placeholder="Tulis pesan Anda..."
                        />

                        {errors.message && (
                          <p className="text-red-500 text-[10px] mt-1">
                            {errors.message.message}
                          </p>
                        )}
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="
                          w-full
                          bg-[#3a918d]
                          text-white
                          py-3
                          rounded-[11px]
                          font-bold
                          text-[14px]
                          hover:bg-[#2f7f79]
                          active:scale-95
                          transition-all
                          disabled:opacity-60
                          flex items-center justify-center gap-2
                        "
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 size={16} className="animate-spin" />
                            Mengirim...
                          </>
                        ) : (
                          <>
                            <Send size={16} />
                            Kirim Pesan
                          </>
                        )}
                      </button>
                    </form>
                  </Panel>
                </div>
              </div>
            )}
          </section>
        </PageTransition>
      </main>

      <Footer />
    </div>
  )
}

export default ContactPage
