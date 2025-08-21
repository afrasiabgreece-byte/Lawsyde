import { createClient } from "@supabase/supabase-js";

// Debug what we're getting
console.log('Raw env values:');
console.log('URL from env:', import.meta.env.VITE_SUPABASE_URL);
console.log('Key from env:', import.meta.env.VITE_SUPABASE_ANON_KEY);

// Use your actual values as fallback if env vars aren't working
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://xrrlidacabeuctjauhjh.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhycmxpZGFjYWJldWN0amF1aGpoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ0MzE2MDksImV4cCI6MjA3MDAwNzYwOX0.CEj6_R6CMkxAqeqZRX3s40IEfinVNJJmUcx_C0aLeXk";

console.log('Final values being used:');
console.log('URL:', supabaseUrl);
console.log('Key length:', supabaseAnonKey?.length);

// Validate URL before creating client
if (!supabaseUrl) {
  throw new Error('Supabase URL is missing');
}

if (!supabaseAnonKey) {
  throw new Error('Supabase anon key is missing');
}

// Test URL validity
try {
  new URL(supabaseUrl);
} catch (error) {
  throw new Error(`Invalid Supabase URL: ${supabaseUrl}`);
}

// Create client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Test functions
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