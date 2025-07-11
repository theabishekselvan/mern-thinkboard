import { ArrowLeftIcon } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router'
import api from '../lib/axios'

const CreatePage = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!title.trim() || !content.trim()) {
      toast.error('All fields are required')
    } 

    setLoading(true)
    try {
      await api.post('/notes', {
        title,
        content
      })
      toast.success('Note created!')
      navigate('/')
    } catch (error) {
      console.log('Error creating note',error);
      if (error.response.status === 429) {
        toast.error("STOP SPAMMING!!!", {
          duration: 4000,
          icon: '☠️'
        })
      } else {
        toast.error('Failed to create the note')
      }
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className='min-h-screen bg-base-200'>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-2xl mx-auto'>
          <Link to={'/'} className='btn btn-ghost mb-6'>
            <ArrowLeftIcon className='size-5' />
            Back to notes
          </Link>

          <div className='card bg-base-100'>
            <div className='card-body'>
              <h2 className='card-title text-2xl mb4'>Create new note</h2>
              <form onSubmit={handleSubmit} >
                <div className='form-control mb-4'>
                  <label className='label'>
                    <span className='label-text'>Title</span>
                    <input type='text' placeholder='Note Title' className='input input-bordered' value={title} onChange={(e) => setTitle(e.target.value)} />
                  </label>
                </div>

                <div className='form-control mb-4'>
                  <label className='label'>
                    <span className='label-text'>Content</span>
                    <textarea 
                      placeholder='Write your note here' 
                      className='textarea textarea-bordered h-32' 
                      value={content} 
                      onChange={(e) => setContent(e.target.value)} />
                  </label>
                </div>

                <div className="card-actions justify-end">
                  <button type='submit' className='btn btn-primary' disabled={loading}>
                    {loading ? "Creating..." : 'Create note'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePage