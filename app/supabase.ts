import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://eonxealfzxeneunfmgde.supabase.co';
const supabaseKey = 'sb_publishable_KNfWxMOKBefkYyOMPe_ezg_ISmgd7_g';

export const supabase = createClient(supabaseUrl, supabaseKey);