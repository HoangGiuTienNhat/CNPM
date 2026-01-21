import { useState, useEffect } from 'react'
import { profileService } from 'src/services/profileService'
import type { Profile, UpdateProfilePayload } from 'src/services/profileService'
import { useAuth } from 'src/hooks/useAuth'

export const useProfile = () => {
  const { user: authUser, updateUser } = useAuth()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState<UpdateProfilePayload>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true)
        const profileData = await profileService.getProfile()
        console.log('Fetched profile from backend:', profileData)
        setProfile(profileData)
        setFormData({
          personalEmail: profileData.personalEmail || '',
          phoneNumber: profileData.phoneNumber || '',
          address: profileData.address || ''
        })
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch profile')
      } finally {
        setLoading(false)
      }
    }
    void fetchProfile()
  }, [])

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleCancel = () => {
    setIsEditing(false)
    if (profile) {
      setFormData({
        personalEmail: profile.personalEmail || '',
        phoneNumber: profile.phoneNumber || '',
        address: profile.address || ''
      })
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const updatedProfile = await profileService.updateProfile(formData)
      console.log('Updated profile from backend:', updatedProfile)
      setProfile(updatedProfile)
      setIsEditing(false)
      // Update user in AuthContext via the updateUser method
      updateUser({
        personalEmail: updatedProfile.personalEmail,
        phoneNumber: updatedProfile.phoneNumber,
        address: updatedProfile.address
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile')
    }
  }

  return {
    profile,
    isEditing,
    formData,
    loading,
    error,
    handleEdit,
    handleCancel,
    handleChange,
    handleSubmit
  }
}
