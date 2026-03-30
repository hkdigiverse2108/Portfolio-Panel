import { Add, Close } from "@mui/icons-material";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material";
import { useState, type FC } from "react";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { Mutations } from "../../Api";
import { setUser } from "../../Store/Slices/AuthSlice";
import CommonProfileAvatar from "./CommonProfileAvatar";
import type { CommonProfileImageUploadProps } from "../../Types";

const CommonProfileImageUpload: FC<CommonProfileImageUploadProps> = ({ fullName, profileImage, className }) => {
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const displayFullName = fullName || `${user?.firstName} ${user?.lastName}`;
  const displayProfileImage = profileImage || user?.profileImage;

  const uploadMutation = Mutations.useUpload();
  const updateProfileMutation = Mutations.useUpdateProfile();

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSelectedFile(null);
    setPreview(null);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("images", selectedFile);

    try {
      const uploadResponse = await uploadMutation.mutateAsync(formData);
      if (uploadResponse.data && uploadResponse.data.length > 0) {
        await updateProfileMutation.mutateAsync({ profileImage: uploadResponse.data[0] });
        dispatch(setUser({ ...user, profileImage: uploadResponse.data[0] }));
      }
      handleClose();
    } catch (error) {
      console.error("Upload failed", error);
    }
  };

  return (
    <>
      <div className={`relative flex items-center justify-center rounded-full bg-brand-500 text-white overflow-hidden cursor-pointer group ${className}`} onClick={handleOpen}>
        <CommonProfileAvatar fullName={displayFullName} profileImage={displayProfileImage} className="w-full h-full" />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <Add className="text-white text-2xl" />
        </div>
      </div>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          Upload Profile Picture
          <IconButton onClick={handleClose} sx={{ position: "absolute", right: 8, top: 8 }}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            {preview ? <img src={preview} alt="Preview" className="w-32 h-32 rounded-full object-cover" /> : <CommonProfileAvatar fullName={displayFullName} profileImage={displayProfileImage} className="w-32 h-32" />}
            <Button variant="contained" component="label">
              Choose Image
              <input type="file" accept="image/*" hidden onChange={handleFileChange} />
            </Button>
            {selectedFile && <Typography variant="body2">{selectedFile.name}</Typography>}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleUpload} variant="contained" disabled={!selectedFile || uploadMutation.isPending || updateProfileMutation.isPending}>
            {uploadMutation.isPending || updateProfileMutation.isPending ? "Uploading..." : "Upload"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CommonProfileImageUpload;
