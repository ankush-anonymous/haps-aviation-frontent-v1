"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Search, Plus, Eye, Edit, Trash2 } from "lucide-react"
import { adminAPI, type AdminResponse, type CreateAdminRequest } from "@/lib/api"

export default function AdminsTab() {
  const [admins, setAdmins] = useState<AdminResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedAdmin, setSelectedAdmin] = useState<AdminResponse | null>(null)
  const [formData, setFormData] = useState<CreateAdminRequest>({
    name: "",
    email: "",
    phone_number: "",
  })

  // Fetch admins from API
  const fetchAdmins = async () => {
    setLoading(true)
    try {
      const response = await adminAPI.getAllAdmins()
      setAdmins(response)
    } catch (error) {
      console.error("Failed to fetch admins:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAdmins()
  }, [])

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await adminAPI.createAdmin(formData)
      setIsCreateDialogOpen(false)
      setFormData({ name: "", email: "", phone_number: "" })
      fetchAdmins()
      alert("Admin created successfully!")
    } catch (error) {
      console.error("Failed to create admin:", error)
      alert("Failed to create admin. Please try again.")
    }
  }

  const handleUpdateAdmin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedAdmin) return

    try {
      await adminAPI.updateAdminById(selectedAdmin.id, formData)
      setIsEditDialogOpen(false)
      setSelectedAdmin(null)
      setFormData({ name: "", email: "", phone_number: "" })
      fetchAdmins()
      alert("Admin updated successfully!")
    } catch (error) {
      console.error("Failed to update admin:", error)
      alert("Failed to update admin. Please try again.")
    }
  }

  const handleDeleteAdmin = async (id: string) => {
    if (confirm("Are you sure you want to delete this admin?")) {
      try {
        await adminAPI.deleteAdminById(id)
        fetchAdmins()
        alert("Admin deleted successfully!")
      } catch (error) {
        console.error("Failed to delete admin:", error)
        alert("Failed to delete admin. Please try again.")
      }
    }
  }

  const openEditDialog = (admin: AdminResponse) => {
    setSelectedAdmin(admin)
    setFormData({
      name: admin.name,
      email: admin.email,
      phone_number: admin.phone_number,
    })
    setIsEditDialogOpen(true)
  }

  const filteredAdmins = admins.filter(
    (admin) =>
      admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Admin Management</h2>
            <p className="text-gray-600">Loading admins...</p>
          </div>
        </div>
        <Card className="border-gray-200">
          <CardContent className="p-6">
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Admin Management</h2>
          <p className="text-gray-600">Manage admin users and permissions</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gray-900 hover:bg-gray-800 text-white">
              <Plus className="mr-2 h-4 w-4" />
              Add New Admin
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Admin</DialogTitle>
              <DialogDescription>Add a new admin user to the platform</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateAdmin} className="space-y-4">
              <div>
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter admin name"
                />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="admin@example.com"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  required
                  value={formData.phone_number}
                  onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                  placeholder="+91 9876543210"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-gray-900 hover:bg-gray-800">
                  Create Admin
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="text-gray-900">All Admins</CardTitle>
          <CardDescription className="text-gray-600">
            A list of all admin users with access to the platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <Search className="h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search admins..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm border-gray-200 focus:border-gray-400"
            />
          </div>

          <div className="rounded-md border border-gray-200">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="text-gray-900 font-medium">Name</TableHead>
                  <TableHead className="text-gray-900 font-medium">Email</TableHead>
                  <TableHead className="text-gray-900 font-medium">Phone Number</TableHead>
                  <TableHead className="text-gray-900 font-medium">Created</TableHead>
                  <TableHead className="text-gray-900 font-medium">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAdmins.map((admin) => (
                  <TableRow key={admin.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium text-gray-900">{admin.name}</TableCell>
                    <TableCell className="text-gray-600">{admin.email}</TableCell>
                    <TableCell className="text-gray-600">{admin.phone_number}</TableCell>
                    <TableCell className="text-gray-600">{new Date(admin.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-600 hover:text-gray-900"
                          onClick={() => openEditDialog(admin)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => handleDeleteAdmin(admin.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Admin</DialogTitle>
            <DialogDescription>Update admin user information</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUpdateAdmin} className="space-y-4">
            <div>
              <Label htmlFor="edit-name">Name *</Label>
              <Input
                id="edit-name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter admin name"
              />
            </div>
            <div>
              <Label htmlFor="edit-email">Email *</Label>
              <Input
                id="edit-email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="admin@example.com"
              />
            </div>
            <div>
              <Label htmlFor="edit-phone">Phone Number *</Label>
              <Input
                id="edit-phone"
                type="tel"
                required
                value={formData.phone_number}
                onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                placeholder="+91 9876543210"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-gray-900 hover:bg-gray-800">
                Update Admin
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
