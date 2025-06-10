---
layout: post
title: "Internals of Windows and Linux File Systems"
categories:
- programming
- research
image:
 path: /assets/images/2025/06/10/Quote.png
 alt: The most technologically efficient machine that man has ever invented is the book. - Northrop Frye
tags:
- Windows
- Linux
- File Systems
---

Working with files in different operating system is really interesting!!!

File creation works differently on Linux and Windows operating systems, and understanding these differences requires looking at how each system handles the fundamental challenge of managing data persistence. Windows makes file creation a reliable operation that either completely succeeds or completely fails. When Windows tells you a file is created, you can trust that it actually exists on your storage device and that all the necessary metadata has been properly written and committed.

Linux handles file creation in a more complex way that involves multiple layers of caching and delayed operations. When you create a file on Linux, the system first stores this information in temporary memory(RAM). The operating system acknowledges the file creation immediately, but the actual physical writing to your storage device happens later through a process called write-back caching. This means there can be a time gap between when you think your file exists and when it actually becomes permanent on disk.

The main difference is that Windows waits to confirm file creation until everything is safely written to storage, while Linux confirms file creation immediately but delays the actual writing to storage for better performance. This fundamental design choice affects everything from how applications behave to how system crashes are handled. When a Windows application receives confirmation that a file has been created, it knows that even a sudden power loss won't lose that file. When a Linux application receives the same confirmation, the file might still be vulnerable to loss until the system gets around to writing it to disk.

This difference also extends to the concept of file system consistency. Windows treats each file operation as a discrete transaction that must be completed fully before moving on to the next operation. Linux treats file operations more like suggestions that will be carried out when the system determines it's most efficient to do so. Both approaches have their merits, but they require different programming strategies and have different implications for data safety and system performance.

## Why?

These differences exist because of different design goals and philosophical approaches between the two operating systems, reflecting decades of evolution in computer science thinking about reliability versus performance.

Windows was designed with simplicity and immediate reliability in mind, following what computer scientists call the "ACID" principles borrowed from database design. The creators wanted users to feel confident that when they save something, it really exists and won't disappear even if something goes wrong with the computer. This approach makes programming easier because developers don't need to worry about extra steps to ensure their files are safe. Microsoft made this choice partly because Windows was intended to be used by everyday people who shouldn't need to understand the technical details of how file systems work.

The Windows philosophy extends deeper into how the operating system handles all kinds of operations. When Windows commits to doing something, it generally tries to complete that commitment immediately and fully. This creates a more predictable environment where applications can assume that successful operations really did succeed. However, this predictability comes at a cost in terms of performance, because waiting for every operation to complete fully before moving on can slow things down significantly.

Linux was designed with performance and flexibility as priorities, following a different philosophy that gives system administrators and developers more control over how their systems behave. Writing to storage devices is much slower than working with memory, sometimes hundreds of times slower depending on the type of storage device you're using. If Linux had to write every single change to storage immediately, everything would become very slow, especially on systems that handle lots of small file operations. Instead Linux collects many changes in memory and writes them all at once to storage, which allows the storage device to optimize how it handles these writes.

The Linux approach also reflects the Unix philosophy of "do one thing and do it well." Rather than trying to handle every possible failure scenario automatically, Linux provides tools that let knowledgeable users handle these scenarios themselves. This means that if you understand how the system works, you can make it perform much better than a system that tries to be safe by default. But it also means that if you don't understand how the system works, you might accidentally lose data in ways that wouldn't happen on Windows.

The trade off is that Linux gives you better performance but requires you to take extra steps if you want immediate reliability. Windows gives you immediate reliability but with slower performance in many scenarios. This difference becomes especially noticeable in server environments where systems might handle thousands of file operations per second. A Linux server can often handle much higher loads than a Windows server, but the Linux server requires more careful programming and system administration to ensure that data doesn't get lost during unexpected shutdowns.

These design choices also reflect how the systems are typically used and the communities that developed them. Windows is often used by regular users who want things to "just work" without thinking about technical details. The Windows development team had to optimize for this use case where users might not understand concepts like data flushing or file system consistency. Linux is often used by developers and system administrators who want more control over exactly how their system behaves and are willing to learn the technical details necessary to use that control responsibly.

probably, the historical context matters too. Windows developed during an era when personal computers were becoming mainstream and needed to be accessible to non-technical users. Linux developed within the Unix tradition where computers were primarily used by technical professionals who understood the underlying systems they were working with. These different target audiences shaped the fundamental design decisions that we still see today.

## How?

The technical implementation of these differences involves several layers of your computer system, each with its own complexities and interactions that determine how reliably your data gets stored.

### Windows Implementation Details

Windows uses a file system called NTFS that includes sophisticated transaction logging and recovery mechanisms. When you create a file, Windows doesn't just write the file data directly to disk. Instead, it follows a careful sequence of operations designed to ensure consistency even if something goes wrong during the process.

First, Windows writes information about the planned change to a special log file called the Master File Table (MFT) journal. This log entry describes exactly what the system intends to do, like creating a new file with a specific name in a specific directory. The $LogFile is a transactional log that records changes to the NTFS volume and ensures data consistency in the event of a system crash by replaying or rolling back transactions during recovery. Only after this log entry is safely written to disk does Windows begin making the actual changes to the file system structures. This approach means that if something interrupts the process, Windows can look at the log when it starts up again and either complete the interrupted operation or undo it completely.

The NTFS file system also maintains multiple copies of critical data structures. The Master File Table itself has a mirror copy that can be used if the primary MFT becomes corrupted. All information about a file, including its size, time and date stamps, permissions, and data content, is stored either in MFT entries, or in space outside the MFT that is described by MFT entries. If the first record of the MFT is corrupted, NTFS reads the second record to find the MFT mirror file, whose first record is identical to the first record of the MFT. This redundancy is part of why Windows can make stronger reliability guarantees than systems that don't maintain these backup structures.

Windows also uses a function called FlushFileBuffers that forces all data to be written to physical storage before returning success. When an application calls this function, Windows doesn't just write the data to the operating system's internal caches. It also sends special commands to the storage device telling it to flush its own internal caches to permanent storage. This ensures that the data really has made it all the way to the magnetic domains on a hard drive or the flash memory cells in an SSD.

The Windows approach to handling storage device caches has evolved over time. In older versions of Windows, the system relied on a feature called Force Unit Access (FUA) to tell storage devices to write data immediately to permanent storage. However, many storage devices didn't implement FUA correctly, which meant that data could still be lost even when applications thought it was safely stored. Modern versions of Windows use a different approach called FLUSH_CACHE that is more widely supported by storage devices and provides better guarantees about data persistence.

### Linux Implementation Complexity

Linux uses a different approach that involves multiple file systems like ext3, ext4, XFS, and Btrfs, each with their own strategies for handling data persistence. The Linux kernel provides a common interface for applications, but the actual implementation details vary significantly depending on which file system you're using and how it's configured.

Most Linux file systems use a strategy called delayed writing or write-back caching where changes are first stored in memory buffers. The kernel maintains these buffers in RAM and marks them as "dirty" when they contain changes that haven't been written to storage yet. Background processes called kernel threads periodically scan through these dirty buffers and write them to storage devices. This process can be quite complex because the kernel has to decide which buffers to write first, how many to write at once, and how to handle situations where the storage device is busy or slow.

The timing of when these background writes happen depends on several factors. The kernel might decide to write dirty buffers when they've been sitting in memory for a certain amount of time, when the amount of dirty data reaches a certain threshold, when the system is running low on free memory, or when an application specifically requests that data be written immediately. Each of these triggers can result in different performance characteristics and different risks if the system crashes before the data gets written.

When you want to force immediate writing, you need to call functions like fsync() to flush data to storage and potentially sync the parent directory as well. The fsync() function tells the kernel to write all dirty buffers associated with a specific file to storage and wait for confirmation that the writes have completed. However, the effectiveness of fsync() depends on how the file system is configured and what type of storage device you're using.

### Directory Synchronization Challenges

The parent directory part is especially important and often misunderstood. When you create a new file, Linux needs to update the directory information to say "this new file exists here." This directory update is separate from writing the actual file data, and it might only exist in memory until you force it to be written to storage. If the system crashes after the file data has been written but before the directory update has been written, the file data might still exist on the storage device but the file system won't know how to find it.

This means that for complete reliability, you often need to call fsync() on both the file itself and the directory that contains the file. Many applications don't realize this requirement and only sync the file data, which leaves them vulnerable to a specific type of data loss where the file data survives a crash but the file itself appears to have never been created.

The directory synchronization problem becomes even more complex when you consider that file systems often have multiple levels of directories. A file path like "/home/user/documents/important.txt" involves several directories, and depending on how the file system is implemented, you might need to sync several of these directories to ensure that the entire path structure is properly committed to storage.

### File System Specific Behaviors

Different Linux file systems handle these challenges in different ways. Some are more conservative and write changes more frequently, while others are more aggressive about keeping data in memory for performance. The ext3 file system, for example, has several different modes that trade off between performance and safety.

In "data=ordered" mode, the file system ensures that file data is written before the metadata that points to it, which prevents certain types of corruption but can hurt performance. In this mode, all data are forced directly out to the main file system prior to its metadata being committed to the journal.

In "data=writeback" mode, the file system allows data and metadata to be written in any order, which can improve performance but creates more opportunities for corruption if the system crashes. The writeback mode provides a similar level of journaling as that of XFS, JFS, and ReiserFS in its default mode - metadata journaling, but a crash and recovery can cause incorrect data to appear in files which were written shortly before the crash.

The "data=journal" mode provides full data and metadata journaling, where all new data is written to the journal first, and then to its final location. This is the safest option but comes with significant performance penalties because it disables delayed allocation and O_DIRECT support.

The exact behavior also depends on mount options like write barriers that control how the file system orders its operations. Write barriers are special markers that tell the storage device "make sure everything before this point is written to permanent storage before you write anything after this point". These barriers are essential for maintaining file system consistency, but they can significantly impact performance because they prevent the storage device from reordering write operations for optimal efficiency. The use of write barriers enforces proper on-disk ordering of journal commits, making volatile disk write caches safe to use, at some performance penalty.

### Storage Device Cache Management

Storage devices themselves add another layer of complexity that both Windows and Linux must handle. Modern hard drives and SSDs have their own internal memory caches that can store several megabytes or even gigabytes of data. These caches are designed to improve performance by allowing the storage device to group related operations together and optimize the order in which they're performed.

However, these caches also create a reliability challenge. Even when the operating system thinks data has been written to storage, it might still only be in the device's cache. If the storage device loses power before it has a chance to write this cached data to permanent storage, the data will be lost even though both the application and the operating system believed it was safely stored.

Both Windows and Linux have mechanisms to force these device caches to write their data to permanent storage, but the implementation details vary. The operating system can send special commands to the storage device telling it to flush its caches, but these commands are relatively expensive in terms of performance. Some storage devices also support a feature called Force Unit Access (FUA) that allows individual write operations to bypass the cache entirely, but support for FUA varies between different types of storage devices and different operating systems.

This is why you sometimes need to "safely eject" USB drives and why that process sometimes takes longer than you might expect. The operating system might think all data has been written, but the USB drive's internal cache might still contain unwritten data. The safe eject process forces everything to be written before you remove the device, and this might involve writing several megabytes of cached data that accumulated over time.

The interaction between all these layers means that achieving true data reliability requires understanding and controlling each level of the storage stack. Application developers need to understand when to call sync functions, system administrators need to understand how to configure file systems appropriately, and hardware designers need to implement cache flushing mechanisms correctly. When any of these layers fails to work as expected, data can be lost even when everything appears to be functioning normally.

## References

- [Microsoft Learn. "NTFS overview."](https://learn.microsoft.com/en-us/windows-server/storage/file-server/ntfs-overview)
- [LWN.net. "Ensuring data reaches disk."](https://lwn.net/Articles/457667/)
- [Wikipedia. "NTFS."](https://en.wikipedia.org/wiki/NTFS)
- [xavier roche's homework. "Everything You Always Wanted To Know About fsync()."](https://blog.httrack.com/blog/2013/11/15/everything-you-always-wanted-to-know-about-fsync/)
- [LWN.net. "Barriers and journaling filesystems."](https://lwn.net/Articles/283161/)
- [Microsoft Learn. "Revised notes on the reliability of FlushFileBuffers."](https://devblogs.microsoft.com/oldnewthing/20170510-00/?p=95505)
- [Microsoft Learn. "NTFS: Enhance Your Apps With File System Transactions."](https://learn.microsoft.com/en-us/archive/msdn-magazine/2007/july/ntfs-enhance-your-apps-with-file-system-transactions)
- [Microsoft Learn. "FlushFileBuffers function (fileapi.h)."](https://learn.microsoft.com/en-us/windows/win32/api/fileapi/nf-fileapi-flushfilebuffers)
- [Linux manual pages. "sync(2) - Linux manual page."](https://www.man7.org/linux/man-pages/man2/sync.2.html)
- [GitHub Gist. "Some important articles on Windows/NTFS - File Caching."](https://gist.github.com/danzek/624d5c3aaa349f0e846281c75c2ec371)
- [Linux manual pages. "fsync(2) - Linux manual page."](https://man7.org/linux/man-pages/man2/fsync.2.html)
- [Red Hat Documentation. "Write barriers implementation."](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/7/html/storage_administration_guide/ch-writebarriers)
- [ScienceDirect. "NTFS Data Tracker: Tracking file data history based on $LogFile."](https://www.sciencedirect.com/science/article/abs/pii/S2666281721002341)
- [DFIR-Notes. "Master File Table (MFT), NTFS, $LogFile, and $UsnJrnl: Forensics."](https://mahmoud-shaker.gitbook.io/dfir-notes/master-file-table-mft-ntfs-usdlogfile-and-usdusnjrnl-forensics)
- [Microsoft Learn. "Master File Table (Local File Systems)."](https://learn.microsoft.com/en-us/windows/win32/fileio/master-file-table)
- [Microsoft Learn. "Revised notes on the reliability of FlushFileBuffers - FLUSH_CACHE evolution."](https://devblogs.microsoft.com/oldnewthing/20170510-00/?p=95505)
- [Baeldung. "What's the Difference Between the ext4 Journal Data Modes?"](https://www.baeldung.com/linux/ext-journal-modes)
- [Stack Overflow. "Ordered Mode vs Writeback Mode in ext3/ext4."](https://stackoverflow.com/questions/12845319/ordered-mode-vs-writeback-mode)
- [Linux Kernel Documentation. "ext4 General Information"](https://www.kernel.org/doc/Documentation/filesystems/ext4.txt)
- [Unix & Linux Stack Exchange. "Is data=journal safer for Ext4 as opposed to data=ordered?"](https://unix.stackexchange.com/questions/127235/is-data-journal-safer-for-ext4-as-opposed-to-data-ordered)
- [Linux Kernel Documentation. "Journal (jbd2) - ext4 data modes."](https://www.kernel.org/doc/html/latest/filesystems/ext4/journal.html)
- [Baeldung. "ext4 Journal Data Modes - data=journal mode."](https://www.baeldung.com/linux/ext-journal-modes)
- [Linux Kernel Documentation. "ext4 General Information - write barriers."](https://www.infradead.org/~mchehab/kernel_docs/admin-guide/ext4.html)
