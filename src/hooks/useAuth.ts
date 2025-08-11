import { create } from 'zustand';
import { supabase } from '@/integrations/supabase/client';
import type { User } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error?: string }>;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  resetPassword: (email: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  updateProfile: (data: {
    full_name?: string;
    phone?: string;
    address?: string;
    city?: string;
    state?: string;
    postal_code?: string;
  }) => Promise<{ error?: string }>;
}

export const useAuth = create<AuthState>((set, get) => ({
  user: null,
  loading: true,

  signUp: async (email: string, password: string, fullName: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        return { error: error.message };
      }

      if (data.user) {
        // Create profile
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            user_id: data.user.id,
            full_name: fullName,
            email: email,
          });

        if (profileError) {
          console.error('Profile creation error:', profileError);
        }
      }

      return {};
    } catch (error) {
      return { error: 'An unexpected error occurred' };
    }
  },

  signIn: async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { error: error.message };
      }

      return {};
    } catch (error) {
      return { error: 'An unexpected error occurred' };
    }
  },

  resetPassword: async (email: string) => {
    try {
      const redirectUrl = `${window.location.origin}/`;
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: redirectUrl,
      });
      if (error) {
        return { error: error.message };
      }
      return {};
    } catch (error) {
      return { error: 'An unexpected error occurred' };
    }
  },

  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null });
  },

  updateProfile: async (data) => {
    try {
      const { user } = get();
      if (!user) return { error: 'Not authenticated' };

      const { error } = await supabase
        .from('profiles')
        .upsert({
          user_id: user.id,
          email: user.email,
          ...data,
        });

      if (error) {
        return { error: error.message };
      }

      return {};
    } catch (error) {
      return { error: 'An unexpected error occurred' };
    }
  },
}));

// Initialize auth state
supabase.auth.getSession().then(({ data: { session } }) => {
  useAuth.setState({ user: session?.user ?? null, loading: false });
});

// Listen for auth changes
supabase.auth.onAuthStateChange((event, session) => {
  useAuth.setState({ user: session?.user ?? null, loading: false });
});