export interface Video {
    id: string
    title: string
    description: string
    video_file?: File
    thumbnail?: File
    file_size?: string
    uploadet_at: string
    video_type: string
}