export {}

declare global {
  interface CustomJwtSessionClaims {
    unsafeMetadata?: {
      role?: 'interviewer' | 'candidate'
    }
  }
}
