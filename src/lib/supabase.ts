import { createClient } from "@supabase/supabase-js";

// Get environment variables with fallbacks and validation
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate that required environment variables are present
if (!supabaseUrl) {
  throw new Error('Missing VITE_SUPABASE_URL environment variable');
}

if (!supabaseAnonKey) {
  throw new Error('Missing VITE_SUPABASE_ANON_KEY environment variable');
}

// Validate URL format
try {
  new URL(supabaseUrl);
} catch (error) {
  throw new Error(`Invalid VITE_SUPABASE_URL: ${supabaseUrl}`);
}

// Initialize Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Enhanced fetch functions with better error handling
export async function fetchLawyers() {
  try {
    const { data, error } = await supabase.from("lawyers").select("*");
    if (error) {
      console.error('Error fetching lawyers:', error);
      throw error;
    }
    return data;
  } catch (error) {
    console.error('Failed to fetch lawyers:', error);
    throw error;
  }
}

export async function fetchProfiles() {
  try {
    const { data, error } = await supabase.from("profiles").select("*");
    if (error) {
      console.error('Error fetching profiles:', error);
      throw error;
    }
    return data;
  } catch (error) {
    console.error('Failed to fetch profiles:', error);
    throw error;
  }
}

export async function fetchAppointments() {
  try {
    const { data, error } = await supabase.from("appointments").select("*");
    if (error) {
      console.error('Error fetching appointments:', error);
      throw error;
    }
    return data;
  } catch (error) {
    console.error('Failed to fetch appointments:', error);
    throw error;
  }
}