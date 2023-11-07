import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://zhasddaajagdulgabuhc.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpoYXNkZGFhamFnZHVsZ2FidWhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc5OTM0NzgsImV4cCI6MjAxMzU2OTQ3OH0.Yt2bYI43zqEyYg9lIoBfK-s9L7NUruAbXmTnu0BVNYE";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
