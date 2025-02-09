/*
  # Create designs table for storing AI-generated flyers

  1. New Tables
    - `designs`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `prompt` (text)
      - `image_url` (text)
      - `preferences` (jsonb)
      - `created_at` (timestamp)
  
  2. Security
    - Enable RLS on `designs` table
    - Add policies for authenticated users to:
      - Read their own designs
      - Create new designs
*/

CREATE TABLE IF NOT EXISTS designs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  prompt text NOT NULL,
  image_url text NOT NULL,
  preferences jsonb NOT NULL DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE designs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own designs"
  ON designs
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create designs"
  ON designs
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);