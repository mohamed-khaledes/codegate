import { v } from 'convex/values'
import { mutation, query } from './_generated/server'

export const addComment = mutation({
  args: {
    contend: v.string(),
    rating: v.string(),
    interviewID: v.id('interviews'),
    interviewerId: v.string()
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error('User is not authenticated')

    return await ctx.db.insert('comments', {
      ...args,
      interviewerId: identity.subject
    })
  }
})

// get all comments for an interview
export const getComments = query({
  args: { interviewId: v.id('interviews') },
  handler: async (ctx, args) => {
    const comments = await ctx.db
      .query('comments')
      .withIndex('interview_id', q => q.eq('interviewID', args.interviewId))
      .collect()
    return comments
  }
})
