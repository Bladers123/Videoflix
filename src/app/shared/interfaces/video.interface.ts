export interface Video {
    id: string
    title: string
    description: string
    video_file?: string
    thumbnail?: File
    file_size?: string
    uploaded_at: string
    video_type: string
}