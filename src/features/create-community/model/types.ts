export type CreateSubredditFormValues = {
   name: string;
   display_name: string;
   description?:string;
   icon_url?: File;
   banner_url?: File;
   is_public?: boolean;
   is_nsfw?: boolean;
}