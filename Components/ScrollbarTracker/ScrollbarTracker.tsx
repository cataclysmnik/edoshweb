"use client"

import { useEffect } from 'react'

export default function ScrollbarTracker() {
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout
    let initialLoadTimeout: NodeJS.Timeout
    let transitionRestoreTimeout: NodeJS.Timeout
    const htmlElement = document.documentElement

    // Hide scrollbar initially
    htmlElement.classList.remove('scrolling')

    // Show scrollbar after 1 second on page load
    initialLoadTimeout = setTimeout(() => {
      htmlElement.classList.add('scrolling')
    }, 1000)

    const handleScroll = () => {
      const transitionSection = document.getElementById('scroll-transition')
      const htmlElement = document.documentElement
      
      // Check if user is scrolling in the transition section
      if (transitionSection) {
        const rect = transitionSection.getBoundingClientRect()
        const isInTransitionSection = rect.top < window.innerHeight && rect.bottom > 0
        
        if (isInTransitionSection && !htmlElement.classList.contains('transitioning')) {
          // User is scrolling into/within transition section - hide scrollbar
          htmlElement.classList.add('scrolling-hidden')
          clearTimeout(scrollTimeout)
          return
        } else if (!isInTransitionSection && htmlElement.classList.contains('scrolling-hidden')) {
          // User scrolled away from transition section - show scrollbar after 2 seconds
          htmlElement.classList.remove('scrolling-hidden')
        }
      }
      
      // If transitioning, remove the transitioning class when user scrolls back up
      if (htmlElement.classList.contains('transitioning')) {
        htmlElement.classList.remove('transitioning')
        // Show scrollbar after 2 seconds
        clearTimeout(transitionRestoreTimeout)
        transitionRestoreTimeout = setTimeout(() => {
          htmlElement.classList.add('scrolling')
        }, 2000)
      } else if (!htmlElement.classList.contains('scrolling-hidden')) {
        // Add scrolling class immediately
        htmlElement.classList.add('scrolling')

        // Clear existing timeout
        clearTimeout(scrollTimeout)

        // Set timeout to remove scrolling class after 2 seconds of inactivity
        scrollTimeout = setTimeout(() => {
          htmlElement.classList.remove('scrolling')
        }, 2000)
      }
    }

    // Also hide scrollbar when transitioning between pages
    const handlePageTransition = () => {
      htmlElement.classList.remove('scrolling')
      clearTimeout(scrollTimeout)
      clearTimeout(initialLoadTimeout)
      clearTimeout(transitionRestoreTimeout)
    }

    // Observer for transitioning class removal - restore scrollbar after 2 seconds
    const checkTransitioningRemoval = () => {
      if (htmlElement.classList.contains('transitioning')) {
        clearTimeout(transitionRestoreTimeout)
        transitionRestoreTimeout = setTimeout(() => {
          htmlElement.classList.add('scrolling')
        }, 2000)
      }
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('beforeunload', handlePageTransition)

    // Check for transitioning class changes
    const observer = new MutationObserver(checkTransitioningRemoval)
    observer.observe(htmlElement, { attributes: true, attributeFilter: ['class'] })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('beforeunload', handlePageTransition)
      observer.disconnect()
      clearTimeout(scrollTimeout)
      clearTimeout(initialLoadTimeout)
      clearTimeout(transitionRestoreTimeout)
    }
  }, [])

  return null
}
