-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 13, 2024 at 08:44 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `elms`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(10) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(100) NOT NULL,
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `username`, `password`, `updatedAt`) VALUES
(3, 'admin', '$2a$10$RP5kTiMj9/mdNvkwyYzk/usgvTgpSpE23fdSRZ9qelbF3T/073qCa', '2024-01-13 19:35:38');

-- --------------------------------------------------------

--
-- Table structure for table `departments`
--

CREATE TABLE `departments` (
  `id` int(11) NOT NULL,
  `departmentCode` varchar(10) NOT NULL,
  `departmentName` text NOT NULL,
  `departmentAlias` varchar(20) NOT NULL,
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `departments`
--

INSERT INTO `departments` (`id`, `departmentCode`, `departmentName`, `departmentAlias`, `updatedAt`) VALUES
(4, 'TD', 'Testing Department', 'TDD', '2024-01-12 19:46:16'),
(8, 'MA', 'Master Accounts', 'MAD', '2024-01-13 06:45:59'),
(9, 'IT', 'Information Technology', 'ITDR', '2024-01-13 19:12:44');

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `id` int(10) NOT NULL,
  `empId` varchar(20) NOT NULL,
  `name` varchar(15) NOT NULL,
  `email` varchar(25) NOT NULL,
  `password` varchar(50) NOT NULL,
  `mobile` text NOT NULL,
  `gender` varchar(7) NOT NULL,
  `dob` date NOT NULL,
  `department` varchar(20) NOT NULL,
  `country` varchar(20) NOT NULL,
  `address` varchar(60) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`id`, `empId`, `name`, `email`, `password`, `mobile`, `gender`, `dob`, `department`, `country`, `address`, `status`, `updatedAt`) VALUES
(5, '202120', 'Pushparaj', 'test@test.com', 'test1234', '8883335430', 'male', '1997-11-27', 'Human Resource', 'India', 'Chennai - 600008', 1, '2024-01-13 19:29:41'),
(7, '202150', 'Karthik', 'test2@test.com', 'test123', '91234567890', 'male', '1996-06-14', 'Information Technolo', 'India', '105B, Kamatchi amman street', 1, '2024-01-13 19:41:38');

-- --------------------------------------------------------

--
-- Table structure for table `leaves`
--

CREATE TABLE `leaves` (
  `id` int(10) NOT NULL,
  `leaveType` varchar(20) NOT NULL,
  `from` date NOT NULL,
  `to` date NOT NULL,
  `description` text NOT NULL,
  `requestedAt` datetime DEFAULT NULL,
  `remark` text NOT NULL,
  `remarkedAt` datetime DEFAULT NULL,
  `status` varchar(10) NOT NULL DEFAULT 'pending',
  `empId` varchar(20) NOT NULL,
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `leaves`
--

INSERT INTO `leaves` (`id`, `leaveType`, `from`, `to`, `description`, `requestedAt`, `remark`, `remarkedAt`, `status`, `empId`, `updatedAt`) VALUES
(9, 'Casual leave', '2024-01-19', '2024-01-19', 'just need it', '2024-01-13 20:18:18', 'no way', '2024-01-13 23:48:04', 'declined', '202120', '2024-01-13 18:18:04'),
(10, 'Casual leave', '2024-01-15', '2024-01-17', 'i need immeditely', '2024-01-14 00:03:52', 'no', '2024-01-14 01:04:51', 'declined', '202120', '2024-01-13 19:34:51'),
(11, 'Casual leave', '2024-01-15', '2024-01-17', 'Just for test', '2024-01-14 00:47:38', 'ok', '2024-01-14 01:05:20', 'approved', '202120', '2024-01-13 19:35:20'),
(12, 'Sick Leave', '2024-01-17', '2024-01-18', 'I need leave', '2024-01-14 01:00:04', 'Ok take it', '2024-01-14 01:04:33', 'approved', '202120', '2024-01-13 19:34:33');

-- --------------------------------------------------------

--
-- Table structure for table `leave_types`
--

CREATE TABLE `leave_types` (
  `id` int(10) NOT NULL,
  `type` varchar(20) NOT NULL,
  `description` varchar(30) NOT NULL,
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `leave_types`
--

INSERT INTO `leave_types` (`id`, `type`, `description`, `updatedAt`) VALUES
(1, 'Casual leave', 'not paid leave', '2024-01-13 07:32:05'),
(4, 'Sick Leave', 'No payment will be provide.', '2024-01-13 15:37:13');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `leaves`
--
ALTER TABLE `leaves`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `leave_types`
--
ALTER TABLE `leave_types`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `departments`
--
ALTER TABLE `departments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `leaves`
--
ALTER TABLE `leaves`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `leave_types`
--
ALTER TABLE `leave_types`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
